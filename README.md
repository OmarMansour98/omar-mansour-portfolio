# Omar Mansour’s portfolio

Standalone static React portfolio prepared for GitHub Pages. All five pages are generated as HTML, so direct links, refreshes and page content work without a server. JavaScript adds the theme switch, chatbot and other interactions.

## Publish when ready

1. Create a public GitHub repository with `main` as its default branch.
2. Upload the contents of this folder, including `.github/workflows/pages.yml`. Do not upload `node_modules` or the ZIP itself.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. Run **Deploy portfolio to GitHub Pages** from the Actions tab (later pushes to `main` deploy automatically).

The workflow detects the Pages base path, supporting both `username.github.io/repository/` and a custom domain. No hosting API keys are needed.

## Custom domain later

Add `omarmansour.online` under **Settings → Pages → Custom domain**, follow GitHub’s DNS instructions, and enable HTTPS when available. Run the deployment workflow again after the domain setting changes. DNS has not been changed by this preparation.

## Local development

Use Node.js 22.13 or newer and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

Build output is in `dist/`. `PAGES_BASE_PATH` defaults to `/`; set it to `/repository/` to test a repository URL. It must start and end with `/`.

## Content

- `app/page.tsx`: homepage
- `lib/projects.ts`: product case studies
- `app/visual-work/page.tsx`: branding and motion galleries
- `lib/knowledge.ts`: prepared chatbot answers
- `public/`: images, logo and two local videos; three campaign videos use YouTube embeds

The chatbot uses local keyword matching, not a generative AI service. Its project and resume information ships in the public JavaScript and is readable by visitors. The resume PDF is not included. Add only information intended for public viewing.

The GitHub source and site will be public on the free plan. No credentials, private hosting configuration or previous Git history are included.
