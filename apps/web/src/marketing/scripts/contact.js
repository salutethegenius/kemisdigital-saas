(function initContactSlider() {
  const overlay = document.getElementById('contactSliderOverlay');
  const panel = document.getElementById('contactSlider');
  const closeBtn = document.getElementById('contactSliderClose');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');
  if (!overlay || !panel || !form) return;

  let isOpen = false;
  let lastFocus = null;

  function getFocusable() {
    return Array.from(
      panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  function resetTurnstile() {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
      try { turnstile.reset(); } catch (e) {}
    }
  }

  function openSlider() {
    if (isOpen) return;
    if (typeof window.__closeMobileDrawer === 'function') {
      window.__closeMobileDrawer();
    }
    isOpen = true;
    lastFocus = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('contact-slider-locked');
    const focusable = getFocusable();
    (focusable.find(el => el.id === 'contact_name') || focusable[0] || closeBtn)?.focus();
  }

  function closeSlider() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('contact-slider-locked');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.querySelectorAll('[data-open-contact]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openSlider();
    });
  });

  closeBtn?.addEventListener('click', closeSlider);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSlider();
  });

  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSlider();
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

  // Auto-open from /contact?open=1 or hash
  if (
    window.location.pathname === '/contact' &&
    (new URLSearchParams(window.location.search).get('open') === '1' ||
      window.location.hash === '#open')
  ) {
    setTimeout(openSlider, 200);
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!statusEl || !submitBtn) return;

    statusEl.textContent = '';
    statusEl.className = 'form-status';

    const turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
    const turnstileToken = turnstileInput?.value || '';
    const turnstileConfigured = !!document.querySelector('#contactTurnstileWrap .cf-turnstile');
    if (turnstileConfigured && !turnstileToken) {
      statusEl.textContent = 'Please complete the verification challenge.';
      statusEl.classList.add('is-error');
      return;
    }

    const payload = {
      contact_name: form.contact_name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || undefined,
      business_name: form.business_name.value.trim(),
      website_url: form.website_url.value.trim() || undefined,
      message: form.message.value.trim(),
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      turnstile_token: turnstileToken || undefined,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        statusEl.textContent = data.message || 'Something went wrong. Please try again.';
        statusEl.classList.add('is-error');
        resetTurnstile();
        return;
      }
      statusEl.textContent = data.message || 'Thank you. We will be in touch soon.';
      statusEl.classList.add('is-success');
      form.reset();
      resetTurnstile();
      setTimeout(closeSlider, 2200);
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again.';
      statusEl.classList.add('is-error');
      resetTurnstile();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
    }
  });

  window.__openContactSlider = openSlider;
  window.__closeContactSlider = closeSlider;
})();
