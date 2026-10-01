import fs from 'node:fs';import path from 'node:path';
import type {ApplicationStatus,MailMessage,OpportunityInput} from '@/domain/types';import {analyzeOpportunity} from '@/domain/analyzer';import {opportunityKey} from '@/domain/dedupe';import {isVisibleInDiscovery,markApplied} from '@/domain/lifecycle';
type Stored=OpportunityInput&ReturnType<typeof analyzeOpportunity>&{id:string;status:ApplicationStatus;dedupeKey:string;discoveredAt:string;lastVerified:string};
type Event={id:string;opportunityId:string;type:string;detail:string;evidence?:string;occurredAt:string};
type MailRecord={id:string;opportunityId:string;threadId?:string;from:string;subject:string;receivedAt:string;classification:string;confidence:string;actionRequired?:string};
type State={rows:Stored[];events:Event[];mails:MailRecord[]};
const file=process.env.JOB_ASSISTANT_DATA_FILE||path.join(process.cwd(),'.data','state.json');let memory:State={rows:[],events:[],mails:[]};let loaded=false;
function load(){if(loaded)return;loaded=true;if(process.env.NODE_ENV==='test')return;try{memory=JSON.parse(fs.readFileSync(file,'utf8'))}catch{}}
function save(){if(process.env.NODE_ENV==='test')return;fs.mkdirSync(path.dirname(file),{recursive:true});const tmp=`${file}.tmp`;fs.writeFileSync(tmp,JSON.stringify(memory,null,2));fs.renameSync(tmp,file)}
function rows(){load();return memory.rows}function events(){load();return memory.events}function mails(){load();return memory.mails}
export const store={
 all:()=>rows(),discovery:()=>rows().filter(r=>isVisibleInDiscovery(r.status)&&r.indiaEligibility!=='NOT_ELIGIBLE'),applications:()=>rows().filter(r=>!isVisibleInDiscovery(r.status)&&r.status!=='IGNORED'),get:(id:string)=>rows().find(r=>r.id===id),
 add:(j:OpportunityInput)=>{const key=opportunityKey(j),existing=rows().find(r=>r.dedupeKey===key);if(existing){existing.lastVerified=new Date().toISOString();save();return existing}const now=new Date().toISOString(),r={...j,...analyzeOpportunity(j),id:crypto.randomUUID(),status:'NEW' as const,dedupeKey:key,discoveredAt:now,lastVerified:now};rows().push(r);save();return r},
 addMany:(jobs:OpportunityInput[])=>jobs.map(j=>store.add(j)),
 apply:(id:string)=>{const r=rows().find(x=>x.id===id);if(!r)throw new Error('Opportunity not found');r.status=markApplied(r.status);events().push({id:crypto.randomUUID(),opportunityId:id,type:'APPLIED',detail:'Marked as applied',occurredAt:new Date().toISOString()});save();return r},
 setStatus:(id:string,status:ApplicationStatus,evidence?:string)=>{const r=rows().find(x=>x.id===id);if(!r)throw new Error('Opportunity not found');r.status=status;events().push({id:crypto.randomUUID(),opportunityId:id,type:status,detail:`Application moved to ${status}`,evidence,occurredAt:new Date().toISOString()});save();return r},
 events:(id:string)=>events().filter(e=>e.opportunityId===id).sort((a,b)=>b.occurredAt.localeCompare(a.occurredAt)),
 recordMail:(opportunityId:string,m:MailMessage,classification:string,confidence:string,actionRequired?:string)=>{if(mails().some(x=>x.id===m.id))return false;mails().push({id:m.id,opportunityId,threadId:m.threadId,from:m.from,subject:m.subject,receivedAt:m.receivedAt,classification,confidence,actionRequired});save();return true},
 actions:()=>mails().filter(m=>m.actionRequired).map(m=>({...m,opportunity:rows().find(r=>r.id===m.opportunityId)})).sort((a,b)=>b.receivedAt.localeCompare(a.receivedAt)),
 stats:()=>{const all=rows();return{total:all.length,new:all.filter(x=>x.status==='NEW').length,applications:all.filter(x=>['APPLIED','SCREENING','INTERVIEW','ASSESSMENT','TECHNICAL','FINAL','OFFER'].includes(x.status)).length,interviews:all.filter(x=>['INTERVIEW','TECHNICAL','FINAL'].includes(x.status)).length,offers:all.filter(x=>x.status==='OFFER').length,rejected:all.filter(x=>x.status==='REJECTED').length,actions:store.actions().length}},
 reset:()=>{memory={rows:[],events:[],mails:[]};loaded=true;save()}
};
