import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

await build();
await build({ build: { ssr: 'src/render.tsx', outDir: '.render', copyPublicDir: false } });
const { render, routes, titleFor } = await import(pathToFileURL(resolve('.render/render.js')));
const template = await readFile('dist/index.html', 'utf8');
for (const route of [...routes, '/404.html']) {
  const destination = route === '/404.html' ? 'dist/404.html' : 'dist' + route + 'index.html';
  await mkdir(resolve(destination, '..'), { recursive: true });
  const title = titleFor(route).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  await writeFile(destination, template.replace('<!--app-html-->', () => render(route)).replace(/<title>.*?<\/title>/, () => '<title>' + title + '</title>'));
}
await writeFile('dist/.nojekyll', '');
await rm('.render', { recursive: true, force: true });
console.log('Generated all portfolio pages as static HTML.');
