'use client';
import {useEffect,useState} from 'react';
export function LocalDate({value}:{value:string}){
  const [label,setLabel]=useState(value);
  useEffect(()=>{const d=new Date(value);setLabel(Number.isNaN(d.getTime())?value:d.toLocaleString())},[value]);
  return <time dateTime={value} suppressHydrationWarning>{label}</time>;
}
