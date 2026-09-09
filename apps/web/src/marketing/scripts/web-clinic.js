(function initWebClinic() {
  const form = document.getElementById('clinicForm');
  const statusEl = document.getElementById('clinicFormStatus');
  const submitBtn = document.getElementById('clinicSubmitBtn');
  const conceptInput = document.getElementById('clinic_concept_id');
  const conceptChip = document.getElementById('clinicConceptChip');
  const conceptLabel = document.getElementById('clinicConceptLabel');
  const conceptClear = document.getElementById('clinicConceptClear');
  const packageInputs = form
    ? Array.from(form.querySelectorAll('input[name="package"]'))
    : [];

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function scrollToElement(el) {
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }

  function selectPackage(value) {
    if (!value) return;
    const match = packageInputs.find((input) => input.value === value);
    if (match) {
      match.checked = true;
      match.dispatchEvent(new Event('change', { bubbles: true }));
    }
    document.querySelectorAll('.clinic-pkg').forEach((card) => {
      card.classList.toggle(
        'is-selected',
        card.getAttribute('data-select-package') === value,
      );
    });
  }

  function setConcept(id, label) {
    if (!conceptInput || !conceptChip || !conceptLabel) return;
    const nextId = id || '';
    const nextLabel = label || '';
    conceptInput.value = nextId;
    if (nextId && nextLabel) {
      conceptLabel.textContent = nextLabel;
      conceptChip.hidden = false;
    } else {
      conceptLabel.textContent = '';
      conceptChip.hidden = true;
    }
  }

  document.querySelectorAll('.clinic-pkg[data-select-package]').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      selectPackage(el.getAttribute('data-select-package'));
      scrollToElement(document.getElementById('review'));
    });
  });
  document.querySelectorAll('.clinic-pkg-cta[data-select-package]').forEach((el) => {
    el.addEventListener('click', () => {
      selectPackage(el.getAttribute('data-select-package'));
    });
  });

  packageInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked) selectPackage(input.value);
    });
  });

  document.querySelectorAll('[data-clinic-concept]').forEach((el) => {
    el.addEventListener('click', () => {
      setConcept(
        el.getAttribute('data-clinic-concept'),
        el.getAttribute('data-clinic-concept-label'),
      );
    });
  });

  conceptClear?.addEventListener('click', () => {
    setConcept('', '');
  });

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('package');
  if (fromQuery) selectPackage(fromQuery);
  else {
    const checked = packageInputs.find((input) => input.checked);
    if (checked) selectPackage(checked.value);
  }

  const conceptFromQuery = params.get('concept');
  if (conceptFromQuery) {
    const match = document.querySelector(
      `[data-clinic-concept="${CSS.escape(conceptFromQuery)}"]`,
    );
    if (match) {
      setConcept(
        match.getAttribute('data-clinic-concept'),
        match.getAttribute('data-clinic-concept-label'),
      );
    }
  }

  if (window.location.hash === '#review') {
    scrollToElement(document.getElementById('review'));
  }

  if (!form || !statusEl || !submitBtn) return;

  function resetTurnstile() {
    if (typeof turnstile !== 'undefined' && turnstile.reset) {
      try {
        const widget = document.querySelector('#clinicTurnstileWrap .cf-turnstile');
        if (widget) turnstile.reset(widget);
        else turnstile.reset();
      } catch {
        /* ignore */
      }
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    const turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
    const turnstileToken = turnstileInput?.value || '';
    const turnstileConfigured = !!document.querySelector(
      '#clinicTurnstileWrap .cf-turnstile',
    );
    if (turnstileConfigured && !turnstileToken) {
      statusEl.textContent = 'Please complete the verification challenge.';
      statusEl.classList.add('is-error');
      return;
    }

    if (!form.terms_ack.checked) {
      statusEl.textContent =
        'Please confirm you understand the review request is not a signed agreement.';
      statusEl.classList.add('is-error');
      return;
    }

    const selected = packageInputs.find((input) => input.checked);
    const conceptId = conceptInput?.value?.trim();

    const payload = {
      contact_name: form.contact_name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || undefined,
      business_name: form.business_name.value.trim(),
      website_url: form.website_url.value.trim() || undefined,
      package: selected?.value || 'unsure',
      message: form.message.value.trim(),
      terms_ack: true,
      source_url: window.location.href,
      user_agent: navigator.userAgent,
      turnstile_token: turnstileToken || undefined,
    };
    if (conceptId) payload.concept_id = conceptId;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/web-clinic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        statusEl.textContent =
          data.message || 'Something went wrong. Please try again.';
        statusEl.classList.add('is-error');
        resetTurnstile();
        return;
      }
      statusEl.textContent =
        data.message || 'Thank you. We will be in touch soon.';
      statusEl.classList.add('is-success');
      form.reset();
      selectPackage('unsure');
      setConcept('', '');
      resetTurnstile();
    } catch {
      statusEl.textContent = 'Something went wrong. Please try again.';
      statusEl.classList.add('is-error');
      resetTurnstile();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request a Free Digital Review →';
    }
  });
})();
