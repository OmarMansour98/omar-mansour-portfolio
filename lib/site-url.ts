export function siteUrl(path: string) {
  return path.startsWith('/') && !path.startsWith('//')
    ? import.meta.env.BASE_URL + path.slice(1)
    : path;
}
