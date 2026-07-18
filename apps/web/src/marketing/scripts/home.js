// Hero parallax
const heroGeo = document.querySelector('.hero-geo');
document.addEventListener('mousemove', e => {
  if (!heroGeo) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  heroGeo.style.transform = `translate(${x}px, ${y}px)`;
});

// GET PAID ONLINE POPUP
(function initGpoPopup() {
  const CONVERTED_KEY = 'kd_payments_popup_converted';
  const overlay = document.getElementById('gpoOverlay');
  const card = document.getElementById('gpoCard');
  const closeBtn = document.getElementById('gpoClose');
  const dismissBtn = document.getElementById('gpoDismiss');
  const cta = document.getElementById('gpoCta');
  if (!overlay || !card) return;

  let converted = false;
  try { converted = localStorage.getItem(CONVERTED_KEY) === '1'; } catch (e) {}
  if (converted) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFocus = null;
  let isOpen = false;

  function getFocusable() {
    return Array.from(card.querySelectorAll('a[href], button:not([disabled])'));
  }

  function openPopup() {
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gpo-locked');
    const focusable = getFocusable();
    (focusable[0] || closeBtn)?.focus();
  }

  function closePopup() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gpo-locked');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  closeBtn?.addEventListener('click', closePopup);
  dismissBtn?.addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closePopup();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  cta?.addEventListener('click', () => {
    try { localStorage.setItem(CONVERTED_KEY, '1'); } catch (e) {}
  });

  const delay = reduceMotion ? 100 : 3000;
  setTimeout(openPopup, delay);
})();
