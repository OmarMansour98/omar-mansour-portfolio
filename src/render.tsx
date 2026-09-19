import { renderToString } from 'react-dom/server';
import App, { routes, titleFor } from './app';
export { routes, titleFor };
export function render(path: string) { return renderToString(<App path={path}/>); }
