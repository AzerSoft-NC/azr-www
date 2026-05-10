export interface TypingRuntimeConfig {
  words: string[];
  typeSpeed: number;
  deleteSpeed: number;
  pauseAfterType: number;
  pauseAfterDelete: number;
}

export type TypingInstancePayload = TypingRuntimeConfig & { id: string };

/**
 * Wires the next `.typing-instance` block on the page (DOM order).
 * Each TypingEffect instance emits one module script that calls this once,
 * so no `define:vars` is needed on the script tag.
 */
export function mountNextTypingInstance(): void {
  const wrap = document.querySelector('.typing-instance:not([data-typing-mounted])');
  if (!(wrap instanceof HTMLElement)) return;
  wrap.setAttribute('data-typing-mounted', '');
  const jsonEl = wrap.querySelector('script[type="application/json"]');
  if (!jsonEl?.textContent) return;
  const payload = JSON.parse(jsonEl.textContent) as TypingInstancePayload;
  startTypingAnimation(payload);
}

function startTypingAnimation(payload: TypingInstancePayload): void {
  const cfg = payload;
  const root = document.getElementById(cfg.id);
  if (!root) return;
  const textEl = root.querySelector('.typing-text');
  if (!(textEl instanceof HTMLElement)) return;
  const output = textEl;

  const measurer = document.createElement('span');
  measurer.setAttribute('aria-hidden', 'true');
  measurer.style.cssText =
    'visibility:hidden;position:absolute;white-space:nowrap;pointer-events:none;';
  const cs = getComputedStyle(root);
  measurer.style.font = cs.font;
  measurer.style.letterSpacing = cs.letterSpacing;
  document.body.appendChild(measurer);

  let maxWidth = 0;
  for (const word of cfg.words) {
    measurer.textContent = word + '|';
    maxWidth = Math.max(maxWidth, measurer.offsetWidth);
  }
  document.body.removeChild(measurer);
  root.style.minWidth = maxWidth + 'px';

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = cfg.words[wordIndex];

    if (isDeleting) {
      charIndex--;
      output.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % cfg.words.length;
        setTimeout(tick, cfg.pauseAfterDelete);
        return;
      }
      setTimeout(tick, cfg.deleteSpeed);
    } else {
      charIndex++;
      output.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, cfg.pauseAfterType);
        return;
      }
      setTimeout(tick, cfg.typeSpeed);
    }
  }

  setTimeout(tick, cfg.pauseAfterDelete);
}
