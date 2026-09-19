import {siteUrl} from '@/lib/site-url';
import ThemeToggle from '@/components/theme-toggle';
export default function Header(){return <header className="nav site-header"><div className="header-inner"><a className="wordmark" href={siteUrl("/")} aria-label="Omar Mansour home"><img className="brand-logo" src={siteUrl("/omar-logo.svg")} alt="Omar Mansour"/></a><nav className="links" aria-label="Main navigation"><a href={siteUrl("/#work")}>Projects</a><a href={siteUrl("/#about")}>About</a><a href="mailto:contact@omarmansour.online">Connect</a></nav><ThemeToggle/></div></header>}
