// Custom cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .product-card, .tension-point').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '48px';
      cursorRing.style.height = '48px';
      cursor.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '32px';
      cursorRing.style.height = '32px';
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.style.borderBottomColor = window.scrollY > 40 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)';
});

// Mobile hamburger drawer
(function initMobileDrawer() {
  const hamburger = document.getElementById('navHamburger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (!hamburger || !drawer || !overlay) return;

  let isOpen = false;

  function openDrawer() {
    if (isOpen) return;
    if (typeof window.__closeContactSlider === 'function') {
      window.__closeContactSlider();
    }
    isOpen = true;
    drawer.hidden = false;
    overlay.hidden = false;
    // force reflow so transition runs
    void drawer.offsetWidth;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('drawer-locked');
  }

  function closeDrawer() {
    if (!isOpen) return;
    isOpen = false;
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('drawer-locked');
    setTimeout(() => {
      if (!isOpen) {
        drawer.hidden = true;
        overlay.hidden = true;
      }
    }, 300);
  }

  hamburger.addEventListener('click', () => {
    if (isOpen) closeDrawer();
    else openDrawer();
  });
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });
  drawer.querySelectorAll('[data-open-contact]').forEach(btn => {
    btn.addEventListener('click', closeDrawer);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeDrawer();
    }
  });

  window.__closeMobileDrawer = closeDrawer;
})();
