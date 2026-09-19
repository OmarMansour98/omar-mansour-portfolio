'use client';
import {useEffect,useRef,useState} from 'react';

export default function CaseNavigation({chapters}:{chapters:{title:string}[]}) {
 const nav=useRef<HTMLElement>(null);
 const [active,setActive]=useState(-1);
 useEffect(()=>{
  const element=nav.current;
  if(!element)return;
  const header=document.querySelector<HTMLElement>('.site-header');
  const main=element.closest('main');
  const sections=chapters.map((_,i)=>document.getElementById('chapter-'+i));
  let frame=0;
  const update=()=>{
   frame=0;
   const headerHeight=header?.getBoundingClientRect().height??68;
   element.style.top=headerHeight+'px';
   main?.style.setProperty('--chapter-nav-height',element.offsetHeight+'px');
   const readingLine=headerHeight+element.offsetHeight+48;
   let current=-1;
   sections.forEach((section,i)=>{if(section&&section.getBoundingClientRect().top<=readingLine)current=i;});
   setActive(current);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const resize=new ResizeObserver(schedule);
  resize.observe(element);
  if(header)resize.observe(header);
  sections.forEach(section=>{if(section)resize.observe(section);});
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  update();
  return ()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[chapters]);
 useEffect(()=>{
  const link=nav.current?.querySelector<HTMLElement>('[aria-current="location"]');
  const track=link?.parentElement;
  if(link&&track)track.scrollTo({left:link.offsetLeft-track.offsetLeft-(track.clientWidth-link.offsetWidth)/2,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 },[active]);
 return <nav ref={nav} className="case-chapter-nav" aria-label="Explore the case study"><div>{chapters.map((chapter,i)=><a key={i} href={'#chapter-'+i} aria-current={active===i?'location':undefined}>{chapter.title}</a>)}</div></nav>;
}
