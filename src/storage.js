export const STORAGE_KEY='core-one-mentor-v1';
export function freshState(){return {completed:[],answers:[],bookmarks:[],notes:{},cards:{},dates:[],lastLesson:'foundations',sections:{},theme:'light',goal:25};}
export function readState(storage){
 try{
  const p=JSON.parse(storage.getItem(STORAGE_KEY));if(!p||typeof p!=='object'||Array.isArray(p))return freshState();
  const s=freshState();
  for(const k of ['completed','bookmarks','dates'])if(Array.isArray(p[k]))s[k]=[...new Set(p[k].filter(v=>typeof v==='string'))];
  if(Array.isArray(p.answers))s.answers=p.answers.filter(a=>a&&typeof a==='object'&&typeof a.id==='string'&&typeof a.correct==='boolean'&&Number.isFinite(a.time)&&Number.isInteger(a.domain)&&a.domain>=1&&a.domain<=5&&['lesson','lesson-previous','practice','ports'].includes(a.context)&&(a.check==null||(Number.isInteger(a.check)&&a.check>=0&&a.check<=2)));
  for(const k of ['notes','cards','sections'])if(p[k]&&typeof p[k]==='object'&&!Array.isArray(p[k]))s[k]=Object.fromEntries(Object.entries(p[k]).filter(([key,v])=>!['__proto__','constructor','prototype'].includes(key)&&(k==='notes'?typeof v==='string':k==='cards'?['known','review'].includes(v):Number.isInteger(v)&&v>=0&&v<=4)));
  if(typeof p.lastLesson==='string')s.lastLesson=p.lastLesson;if(p.theme==='dark')s.theme='dark';if([10,25,45,60].includes(p.goal))s.goal=p.goal;
  return s;
 }catch{return freshState();}
}
export function accuracy(answers){return answers.length?Math.round(answers.filter(a=>a.correct).length/answers.length*100):null;}
export function localDate(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function streak(dates,now=new Date()){const day=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(!dates.includes(localDate(day)))day.setDate(day.getDate()-1);let n=0;while(dates.includes(localDate(day))){n++;day.setDate(day.getDate()-1);}return n;}
