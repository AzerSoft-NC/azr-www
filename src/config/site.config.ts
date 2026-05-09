import { SITE_URL, GOOGLE_SITE_VERIFICATION } from 'astro:env/server';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  socialLinks: string[];
  twitter?: {
    site: string;
    creator: string;
  };
  verification?: {
    google?: string;
    bing?: string;
  };
  /** Path to author photo (relative to site root, e.g. '/avatar.jpg'). Used in Person schema. */
  authorImage?: string;
  /**
   * Set to false if your blog post images already match your theme color
   * and you don't want the brand color overlay applied on top of them.
   */
  blogImageOverlay?: boolean;
  /**
   * Branding configuration
   * Logo files: Replace SVGs in src/assets/branding/
   * Favicon: Replace in public/favicon.svg
   */
  branding: {
    /** Logo alt text for accessibility */
    logo: {
      alt: string;
      /** Path to logo image for structured data (e.g. '/logo/logo_transparent.svg'). File in public/. */
      imageUrl?: string;
    };
    /** Favicon path (lives in public/) */
    favicon: {
      svg: string;
    };
    /** Theme colors for manifest and browser UI */
    colors: {
      /** Browser toolbar color (hex) */
      themeColor: string;
      /** PWA splash screen background (hex) */
      backgroundColor: string;
    };
  };
}

const siteConfig: SiteConfig = {
  name: 'Azer Soft',
  description:
    "Société de services informatiques en Nouvelle-Calédonie : développement logiciel, conseil, audit, SIG et accompagnement projet.",
  url: SITE_URL || 'https://azersoft.nc',
  ogImage: '/og-default.png',
  author: 'Azer Soft SARL',
  email: 'contact@azersoft.nc',
  phone: '+687873499',
  address: {
    street: '',
    city: 'Noumea',
    state: '',
    zip: '98800',
    country: 'New Caledonia',
  },
  socialLinks: ['mailto:contact@azersoft.nc'],
  twitter: {
    site: '',
    creator: '',
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  authorImage: '/logo/logo_transparent.svg',
  blogImageOverlay: true,
  branding: {
    logo: {
      alt: 'Azer Soft',
      imageUrl: '/logo/logo_transparent.svg',
    },
    favicon: {
      svg: '/favicon.svg',
    },
    colors: {
      /** Browser chrome — neutral light to match default light theme */
      themeColor: '#f8f9fa',
      backgroundColor: '#ffffff',
    },
  },
};

export default siteConfig;
