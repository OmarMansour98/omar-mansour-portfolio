import CaseNavigation from '@/components/case-navigation';
import stories from '@/lib/case-stories.json';
import {asset,projects} from '@/lib/projects';
type Block={type:string;text?:string;src?:string;items?:string[]};
const chapters:Record<string,{title:string;start:number;end:number}[]>={
 booking:[{title:'The challenge',start:1,end:2},{title:'Understanding the journey',start:2,end:8},{title:'Design decisions',start:8,end:18},{title:'Results & feedback',start:18,end:23},{title:'What I learned',start:23,end:27}],
 'design-system':[{title:'The challenge',start:1,end:8},{title:'Audit & approach',start:8,end:11},{title:'Building the system',start:11,end:16},{title:'Validation & iteration',start:16,end:19},{title:'Handoff & ongoing maintenance',start:19,end:21}],
 'provider-profile':[{title:'The challenge',start:1,end:2},{title:'Research observations',start:2,end:3},{title:'Design decisions',start:3,end:4},{title:'Outcomes & reflection',start:4,end:5}]
};
const cleanTitle=(title:string)=>title.replace(/^[A-Z0-9]+\.\s*/, '').replace(/:$/,'');
function Body({blocks,title}:{blocks:Block[];title:string}) {if(["User Feedback","Reduced Cognitive Load","Mobile Optimization"].includes(title)) return <div className="story-body"><ul className="story-bullets">{blocks.map((block,i)=><li key={i}>{block.text}</li>)}</ul></div>;return <div className="story-body">{blocks.map((block,j)=>{
 if(block.type==='list'&&block.items)return <ul className="story-bullets" key={j}>{block.items.map((item,i)=><li key={i}>{item}</li>)}</ul>;
 if(block.type==='image'&&block.src){const caption=blocks[j+1]?.type==='text'&&((blocks[j+1].text?.length??0)<180)?blocks[j+1].text:undefined;return <figure key={j}><a href={asset(block.src.replace('assets/images/',''))} target="_blank" rel="noreferrer" aria-label={'Enlarge '+title+' design'}><img src={asset(block.src.replace('assets/images/',''))} alt={caption||title+' — design reference'} loading="lazy"/></a>{caption&&<figcaption>{caption}</figcaption>}</figure>}
 if(block.type==='embed'&&block.src)return <figure key={j}><iframe className="story-prototype" src={block.src} title="Vosita provider profile redesign prototype" loading="lazy" allowFullScreen/><figcaption><a href={block.src} target="_blank" rel="noreferrer">Open the interactive prototype ↗</a></figcaption></figure>;
 if(j>0&&blocks[j-1].type==='image'&&(block.text?.length??0)<180)return null;
 const text=block.text||'';const label=text.match(/^([^:]{3,45}):\s+([\s\S]+)$/);
 return <p key={j}>{label?<><strong>{label[1]}:</strong> {label[2]}</>:text}</p>;
 })}</div>}
export default function CaseStory({slug}:{slug:string}) {
 const sections=stories[slug as keyof typeof stories];const project=projects[slug];
 return <>
 <section className="case-overview" id="story-0"><h2>Overview</h2><Body blocks={sections[0].blocks} title="Overview"/></section>
 <img className="case-cover" src={asset(project.cover)} alt={slug==='provider-profile'?'Original provider profile before redesign':'Selected design work for '+project.title}/>
 <CaseNavigation chapters={chapters[slug]}/>
 {chapters[slug].map((chapter,i)=><section className="case-chapter" id={'chapter-'+i} key={i}><header><h2>{chapter.title}</h2></header><div className="chapter-content">{sections.slice(chapter.start,chapter.end).map((section,j)=>{const index=chapter.start+j;const single=chapter.end-chapter.start===1;const flow=slug==='booking'&&[4,5,6,7,8,15,16,17].includes(index);const minor=slug==='booking'&&index>=9&&index<=14;const mediaStart=minor?section.blocks.findIndex(block=>block.type==='image'||block.type==='embed'):-1;if(mediaStart>=0)return <section className="story-subsection" id={'story-'+index} key={index}><div className="story-decision"><h4>{cleanTitle(section.title)}</h4><Body blocks={section.blocks.slice(0,mediaStart)} title={cleanTitle(section.title)}/></div><div className="story-decision-media"><Body blocks={section.blocks.slice(mediaStart)} title={cleanTitle(section.title)}/></div></section>;return <section className={'story-subsection'+(minor?' story-decision':'')} id={'story-'+index} key={index}>{!single&&(minor?<h4>{cleanTitle(section.title)}</h4>:<h3>{flow?section.title:cleanTitle(section.title)}</h3>)}{slug==='booking'&&index===3?<div className="story-body"><p>{section.blocks[0].text}</p><ol className="key-flows">{section.blocks.slice(1).map((block,k)=><li key={k}>{block.text}</li>)}</ol></div>:<Body blocks={section.blocks} title={cleanTitle(section.title)}/>}</section>})}</div></section>)}
 <aside className="story-evidence">{slug==='booking'?'Results describe the usability testing reported for this project. The original study does not specify participant counts or a full testing protocol; completion rates are study outcomes, not a guarantee for every booking.':slug==='design-system'?'Development and QA improvements reflect team feedback. No numerical efficiency measurements are available in this case study.':'Post-launch outcomes are qualitative observations. No numerical conversion improvement is claimed.'}</aside>
 </>;
}

