/**
 * Socials Configuration
 *
 * Defines the social links that appear in the site footer.
 */

export interface SocialLink {
  platform: 'github' | 'twitter' | 'linkedin' | 'facebook' | 'instagram' | string;
  href: string;
  label?: string;
}

export const SocialLinks: SocialLink[] = [
  { platform: 'github', href: '#' },
  { platform: 'twitter', href: '#' },
];

// Social platform to icon mapping
export const socialIcons: Record<string, string> = {
  github: 'github',
  twitter: 'x-twitter',
  linkedin: 'linkedin',
  instagram: 'instagram',
  bluesky: 'bluesky',
  facebook: 'facebook',
  youtube: 'youtube',
  tiktok: 'tiktok',
  twitch: 'twitch',
  discord: 'discord',
  telegram: 'telegram',
  whatsapp: 'whatsapp',
};

// Get icon for social platform
export function getSocialIcon(platform: string): string {
  return socialIcons[platform] || platform;
}
