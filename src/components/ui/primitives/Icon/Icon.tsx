/**
 * Icon component (React)
 * UI icons  → Lucide  (lucide.dev)
 * Brand/social icons → Simple Icons (simpleicons.org)
 *
 * Same public API as before — short names (e.g. "arrow-right") or full Iconify
 * ids (e.g. "simple-icons:html5").
 */
import { Icon as IconifyIcon } from '@iconify/react';
import { cn } from '@/lib/cn';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  class?: string;
  className?: string;
  [key: string]: unknown;
}

const sizes: Record<string, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

/**
 * Maps short legacy names → fully-qualified Iconify names.
 * Social / brand icons use simple-icons; everything else uses lucide.
 */
const iconMap: Record<string, string> = {
  // Social & brand → Simple Icons
  github:           'simple-icons:github',
  'x-twitter':      'simple-icons:x',
  twitter:          'simple-icons:x',
  instagram:        'simple-icons:instagram',
  linkedin:         'simple-icons:linkedin',
  bluesky:          'simple-icons:bluesky',
  // Tech stack → Simple Icons
  'brand-astro':      'simple-icons:astro',
  'brand-tailwind':   'simple-icons:tailwindcss',
  'brand-typescript': 'simple-icons:typescript',
  'brand-react':      'simple-icons:react',
  'brand-mdx':        'simple-icons:mdx',
  'brand-claude':     'simple-icons:anthropic',
};

export function Icon({
  name,
  size = 'md',
  strokeWidth = 2,
  class: classProp,
  className,
  ...rest
}: IconProps) {
  const resolvedName = name.includes(':')
    ? name
    : iconMap[name] ?? `lucide:${name}`;
  const isSimpleIcon = resolvedName.startsWith('simple-icons:');

  return (
    <IconifyIcon
      icon={resolvedName}
      className={cn(sizes[size], 'shrink-0', classProp, className)}
      aria-hidden="true"
      strokeWidth={isSimpleIcon ? undefined : strokeWidth}
      {...rest}
    />
  );
}

export default Icon;
