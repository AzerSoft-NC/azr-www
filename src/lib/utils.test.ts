import { describe, expect, it, vi } from 'vitest';
import { formatDate, generateId, getReadingTime, isExternalUrl, resolveSocialLinks } from './utils';

describe('formatDate', () => {
  it('includes year and month name for a fixed UTC date', () => {
    const s = formatDate(new Date(Date.UTC(2024, 5, 15)), 'en-US');
    expect(s).toContain('2024');
    expect(s).toMatch(/June/i);
  });
});

describe('getReadingTime', () => {
  it('returns 1 minute for short text', () => {
    expect(getReadingTime('hello')).toBe(1);
  });

  it('ceilings words at 200 per minute', () => {
    const twoHundred = Array.from({ length: 200 }, () => 'word').join(' ');
    expect(getReadingTime(twoHundred)).toBe(1);
    const twoOhOne = `${twoHundred} word`;
    expect(getReadingTime(twoOhOne)).toBe(2);
  });

  it('matches current behavior for empty string', () => {
    expect(getReadingTime('')).toBe(1);
  });
});

describe('generateId', () => {
  it('prefixes with default id-', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
    expect(generateId()).toMatch(/^id-[a-z0-9]+$/);
    vi.restoreAllMocks();
  });

  it('uses custom prefix', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(generateId('btn')).toMatch(/^btn-[a-z0-9]+$/);
    vi.restoreAllMocks();
  });
});

describe('isExternalUrl', () => {
  it('returns true for http(s) URLs', () => {
    expect(isExternalUrl('https://example.com')).toBe(true);
    expect(isExternalUrl('http://example.com/path')).toBe(true);
  });

  it('returns false for relative and other schemes', () => {
    expect(isExternalUrl('/about')).toBe(false);
    expect(isExternalUrl('mailto:a@b.co')).toBe(false);
    expect(isExternalUrl('')).toBe(false);
  });
});

describe('resolveSocialLinks', () => {
  it('maps known hosts and drops unknown URLs', () => {
    expect(
      resolveSocialLinks([
        'https://github.com/org/repo',
        'https://example.com/nothing',
        'https://x.com/user',
      ])
    ).toEqual([
      {
        key: 'github',
        href: 'https://github.com/org/repo',
        label: 'GitHub',
        icon: 'github',
      },
      {
        key: 'twitter',
        href: 'https://x.com/user',
        label: 'X / Twitter',
        icon: 'x-twitter',
      },
    ]);
  });

  it('matches bluesky hosts', () => {
    const [one] = resolveSocialLinks(['https://bsky.app/profile/user']);
    expect(one?.key).toBe('bluesky');
    const [two] = resolveSocialLinks(['https://handle.bluesky.social']);
    expect(two?.key).toBe('bluesky');
  });
});
