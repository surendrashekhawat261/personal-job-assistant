export interface SearchSettings { minMatch:number; notifyMatch:number; preferredCurrencies:string[]; allowUnknownEligibility:boolean; searchIntervalHours:number; emailSyncIntervalHours:number; }
export const defaultSettings:SearchSettings={minMatch:60,notifyMatch:82,preferredCurrencies:['USD','EUR','GBP','CAD','AUD'],allowUnknownEligibility:true,searchIntervalHours:6,emailSyncIntervalHours:3};
