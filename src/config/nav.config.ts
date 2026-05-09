/**
 * Navigation Configuration
 *
 * Defines which pages appear in the site navigation and their display order.
 * Astro handles routing via the filesystem — this only controls nav menus.
 */

export interface NavItem {
  label: string;
  href: string;
  order: number;
}

export const navItems: NavItem[] = [
  { label: 'Accueil', href: '/', order: 1 },
  { label: 'Competences', href: '/#competences', order: 2 },
  { label: 'Prestations', href: '/#prestations', order: 3 },
  { label: 'Clients', href: '/#clients', order: 4 },
  { label: 'Blog', href: '/blog', order: 5 },
  { label: 'Contact', href: '/#contact', order: 6 },
];

/**
 * Get navigation items sorted by order
 */
export function getNavItems(): NavItem[] {
  return [...navItems].sort((a, b) => a.order - b.order);
}
