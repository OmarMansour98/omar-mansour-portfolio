import Home from '@/app/page';
import VisualWork from '@/app/visual-work/page';
import Project from '@/app/work/[slug]/page';
import Header from '@/components/header';
import Chat from '@/components/chat';
import { projects } from '@/lib/projects';
import { siteUrl } from '@/lib/site-url';

export const routes = ['/', '/visual-work/', ...Object.keys(projects).map(slug => '/work/' + slug + '/')];
export function titleFor(path: string) {
  const slug = path.split('/')[2];
  return (projects[slug]?.title || (path.startsWith('/visual-work') ? 'Brand & Motion' : path === '/' ? 'Product & UX Designer' : 'Page not found')) + ' — Omar Mansour';
}
export default function App({ path }: { path: string }) {
  const slug = path.split('/')[2];
  const content = path === '/' ? <Home/> : path.replace(/\/$/, '') === '/visual-work' ? <VisualWork/> : /^\/work\/[^/]+\/?$/.test(path) && projects[slug] ? <Project slug={slug}/> : <main className="wrap"><section className="case-hero"><h1>Page not found.</h1><p><a href={siteUrl('/')}>Return to Omar’s portfolio</a></p></section></main>;
  return <><Header/>{content}<Chat/></>;
}
