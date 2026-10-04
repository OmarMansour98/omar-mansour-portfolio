'use client';
import {useEffect,useRef,useState} from 'react';
export default function ImageViewer(){
 const dialog=useRef<HTMLDialogElement>(null);
 const opener=useRef<HTMLElement|null>(null);
 const [image,setImage]=useState<{src:string;alt:string}|null>(null);
 useEffect(()=>{
  function open(event:MouseEvent){
   const link=(event.target as Element).closest<HTMLAnchorElement>('.story-body figure a:has(img), .visual-gallery figure a:has(img)');
   if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   event.preventDefault();opener.current=link;
   setImage({src:link.href,alt:link.querySelector('img')?.alt||'Project image'});
  }
  document.addEventListener('click',open);
  return()=>document.removeEventListener('click',open);
 },[]);
 useEffect(()=>{if(image&&!dialog.current?.open)dialog.current?.showModal()},[image]);
 function close(){dialog.current?.close()}
 return <dialog ref={dialog} className="image-viewer" aria-label="Project image viewer" onClose={()=>{setImage(null);opener.current?.focus()}} onClick={event=>{if(event.target===event.currentTarget)close()}}>
  <button className="image-viewer-close" type="button" aria-label="Close image viewer" onClick={close} autoFocus><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
  {image&&<img src={image.src} alt={image.alt}/>}
 </dialog>
}
