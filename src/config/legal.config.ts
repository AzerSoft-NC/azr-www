/**
 * Legal Configuration
 *
 * Defines the legal links that appear in the site footer.
 */

import type { NavItem } from './nav.config';

export const LegalLinks: NavItem[] = [
  { label: 'Politique de confidentialité', href: '/privacy' },
  { label: "Conditions d'utilisation", href: '/terms' },
  { label: 'Mentions légales', href: '/mentions' },
];
