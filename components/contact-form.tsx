'use client';
import {useState} from 'react';
export default function ContactForm(){
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 async function send(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;setStatus('sending');
  try{
   const response=await fetch('https://formsubmit.co/ajax/contact@omarmansour.online',{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
   const result=await response.json();
   if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Submission failed');
   setStatus('success');form.reset();
  }catch{setStatus('error')}
 }
 return <form className="contact-form" onSubmit={send}>
  <div className="contact-fields"><label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254}/></label></div>
  <label>Message<textarea name="message" rows={5} required maxLength={5000} placeholder="Tell me a little about your project or opportunity."/></label>
  <input type="hidden" name="_subject" value="New portfolio contact message"/>
  <input type="hidden" name="_template" value="table"/>
  <div className="contact-honeypot" aria-hidden="true"><label>Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off"/></label></div>
  <button type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send message'}</button>
  <p className="contact-status" role="status">{status==='success'?'Thanks! Your message has been submitted.':status==='error'?'Your message could not be sent. Please try again, or email contact@omarmansour.online.':''}</p>
 </form>
}
