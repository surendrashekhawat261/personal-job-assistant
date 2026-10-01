import type {OpportunityInput} from '@/domain/types';
export interface SearchHit{title:string;url:string;snippet:string;source:string;}
export interface SearchProvider{search(query:string):Promise<SearchHit[]>}
export interface JobSource{discover():Promise<OpportunityInput[]>}
