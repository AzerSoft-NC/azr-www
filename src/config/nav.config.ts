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
  { label: 'Nos Offres', href: '#offers' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export const PageNavItems: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Offres', href: '/offers' },
  { label: 'Portfolio', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'À propos', href: '/about' },
];

export const FooterNavItems: NavItem[] = [];

export const FooterLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Préstations',
    links: [
      { label: 'Nos Compétences', href: '/skills' },
      { label: 'Nos Offres', href: '/offers' },
      { label: 'Nos Réalisations', href: '/projects' },
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
