import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { titleFor } from './app';
import '@/app/globals.css';

const base = import.meta.env.BASE_URL;
const path = '/' + window.location.pathname.slice(base.length);
document.title = titleFor(path);
const root = document.getElementById('root')!;
if (root.querySelector('header')) hydrateRoot(root, <App path={path}/>);
else createRoot(root).render(<App path={path}/>);
