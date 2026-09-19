import CaseStory from '@/components/case-story';

import {siteUrl} from '@/lib/site-url';
import {projects,asset} from '@/lib/projects';
export default function Project({slug}:{slug:string}){const p=projects[slug];return <main className="wrap"><div className="case-hero"><div className="eyebrow">{p.tag}</div><h1>{p.title}</h1><p>{p.subtitle}</p></div><div className="facts"><div><b>My role</b>{p.role}</div><div><b>Scope</b>{p.scope}</div><div><b>Outcome</b>{p.outcome}</div></div><CaseStory slug={slug}/><section className="case-section related-work"><h2>More selected work</h2><div>{Object.entries(projects).filter(([key])=>key!==slug).map(([key,project])=><p key={key}><a className="text-link" href={siteUrl('/work/'+key)}>{project.title}</a></p>)}<p><a className="text-link" href={siteUrl("/#work")}>← Back to selected work</a></p></div></section><footer className="footer">© Omar Mansour. Views are my own and do not represent my employer.</footer></main>}

