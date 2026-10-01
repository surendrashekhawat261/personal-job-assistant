'use client';
import { useEffect,useState } from 'react';
type Row={id:string;title:string;company:string;compensation?:string;overallMatch:number;shortlistLikelihood:string;indiaEligibility:string;employmentType:string;selectedProfile:string;matchedSkills:string[];status:string;url:string};
export default function Home(){
 const [rows,setRows]=useState<Row[]>([]); const load=()=>fetch('/api/opportunities?bucket=discovery').then(r=>r.json()).then(setRows); useEffect(()=>{load()},[]);
 const apply=async(id:string)=>{await fetch('/api/applications',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({opportunityId:id})});load()};
 return <main><header><p className="eyebrow">PRIVATE • SINGLE USER</p><h1>My Job Search</h1><p>Resume-driven worldwide remote & B2B opportunity finder</p></header>
 <section className="stats"><div><b>{rows.length}</b><span>Actionable opportunities</span></div><div><b>{rows.filter(x=>x.indiaEligibility==='CONFIRMED').length}</b><span>India confirmed</span></div><div><b>{rows.filter(x=>x.employmentType==='B2B'||x.employmentType==='CONTRACT').length}</b><span>Contracts</span></div></section>
 <section><h2>Best new opportunities</h2>{rows.length===0?<p>No new opportunities in discovery.</p>:rows.sort((a,b)=>b.overallMatch-a.overallMatch).map(r=><article key={r.id}><div><p className="company">{r.company}</p><h3>{r.title}</h3><div className="chips"><span>{r.overallMatch}% match</span><span>Shortlist {r.shortlistLikelihood.replace('_',' ')}</span><span>{r.indiaEligibility}</span><span>{r.employmentType}</span><span>{r.selectedProfile} CV</span></div><p>{r.matchedSkills.slice(0,8).join(' • ')}</p>{r.compensation&&<p className="money">{r.compensation}</p>}</div><div className="actions"><a href={r.url} target="_blank">Original job</a><button onClick={()=>apply(r.id)}>Mark applied</button></div></article>)}</section>
 </main>
}
