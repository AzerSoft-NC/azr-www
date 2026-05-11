/**
 * Navigation Configuration
 *
 * Defines which pages appear in the site navigation and their display order.
 * Astro handles routing via the filesystem — this only controls nav menus.
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export const LandingNavItems: NavItem[] = [
  { label: 'Compétences', href: '#tech-stack' },
  { label: 'Préstations', href: '#prestations' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export const PageNavItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  // { label: 'Projets', href: '/projects' },
  { label: 'Prestations', href: '/prestations' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'À propos', href: '/about' },
];

export const FooterNavItems: NavItem[] = [];

export const FooterLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Prestations',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Docs', href: '#' },
    ],
  },
  {
    title: 'Azer Soft',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'À propos', href: '/about' },
    ],
  },
];
