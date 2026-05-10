import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges conditional classes and drops falsy', () => {
    expect(cn('px-2', false && 'hidden', 'py-1')).toBe('px-2 py-1');
  });

  it('resolves Tailwind conflicts in favor of the last winning utility', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
    expect(cn('text-sm', 'text-base')).toBe('text-base');
  });

  it('works with object syntax from clsx', () => {
    expect(cn('font-normal', { 'font-bold': true, italic: false })).toBe('font-bold');
  });
});
