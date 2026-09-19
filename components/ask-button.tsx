'use client';
export default function AskButton(){return <button className="ask-hero" onClick={()=>window.dispatchEvent(new Event('open-omar-chat'))}>Ask me anything</button>}

