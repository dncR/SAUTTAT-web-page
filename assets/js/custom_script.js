// Configuration: adjust if the site is served from a different base path.
const defaultBase = () => (window.location.pathname.includes('/pages/') ? '..' : '.');
window.STATIC_BASE = window.STATIC_BASE ?? defaultBase();
const STATIC_BASE = window.STATIC_BASE;

const resolveIncludePath = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/')) return path;
  return `${STATIC_BASE.replace(/\/$/, '')}/${path}`;
};

let bootstrapLoader;

const ensureBootstrapBundle = () => {
  if (window.bootstrap) return Promise.resolve();
  if (bootstrapLoader) return bootstrapLoader;

  const script = document.createElement('script');
  script.src =
    window.BOOTSTRAP_BUNDLE_SRC ||
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  bootstrapLoader = new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Bootstrap JS'));
  }).catch((err) => {
    console.error(err);
  });

  return bootstrapLoader;
};

const injectIncludes = async () => {
  const targets = Array.from(document.querySelectorAll('[data-include]'));
  const basePrefix = () => `${STATIC_BASE.replace(/\/$/, '')}/`;
  await Promise.all(
    targets.map(async (el) => {
      const includePath = resolveIncludePath(el.getAttribute('data-include'));
      if (!includePath) return;
      try {
        const res = await fetch(includePath);
        if (!res.ok) throw new Error(`Failed to load include: ${includePath}`);
        const raw = await res.text();
        const html = raw.replace(/\{\{\s*BASE\s*\}\}/g, basePrefix());
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        el.replaceWith(template.content);
      } catch (err) {
        console.error(err);
      }
    })
  );
};

const highlightNav = () => {
  const path = window.location.pathname || '';
  const file = path.split('/').filter(Boolean).pop() || 'index.html';
  const matchKey = file.replace('.html', '') || 'index';
  const normalised = `${path}${path.endsWith('/') ? '' : '/'}`;

  document.querySelectorAll('[data-nav-match]').forEach((link) => {
    const key = link.getAttribute('data-nav-match');
    const href = link.getAttribute('href') || '';
    const isActive =
      matchKey === key ||
      href.includes(matchKey) ||
      normalised.includes(key) ||
      (key === 'home' && (matchKey === 'index' || matchKey === ''));

    if (isActive) {
      link.classList.add('active');
      const dropdownToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
      if (dropdownToggle) dropdownToggle.classList.add('active');
    }
  });
};

const normalizeNavLinks = () => {
  const base = STATIC_BASE.replace(/\/$/, '');
  document.querySelectorAll('[data-nav-match]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('http')) return;
    if (/^(\.\/|\.\.\/)/.test(href)) return;
    const cleaned = href.replace(/^\/+/, '');
    link.setAttribute('href', `${base}/${cleaned}`);
  });
  const brand = document.querySelector('[data-brand-home]');
  if (brand) {
    brand.setAttribute('href', `${base}/index.html`);
  }
};

const initBootstrapHelpers = () => {
  if (!window.bootstrap) return;
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach((triggerEl) => {
    new bootstrap.Tooltip(triggerEl);
  });
};

const initNavbarHoverDropdowns = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  if (!dropdowns.length) return;
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.hoverDropdownInit === 'true') return;
    dropdown.dataset.hoverDropdownInit = 'true';

    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (event) => {
      if (!isDesktop()) return;
      event.preventDefault();
    });

    toggle.addEventListener('dblclick', (event) => {
      if (!isDesktop()) return;
      event.preventDefault();
      toggle.blur();
    });

    dropdown.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      toggle.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      toggle.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('show');
    });
  });
};

const initScrollingHeader = () => {
  const header = document.querySelector('header.sticky-top');
  if (!header || header.dataset.scrollFadeInit === 'true') return;
  header.dataset.scrollFadeInit = 'true';

  const nav = header.querySelector('nav');
  const solid = 'rgba(255, 255, 255, 1)';
  const translucent = 'rgba(255, 255, 255, 0.5)';
  let timeoutId = null;
  let lastScrollTime = 0;
  let isHovering = false;
  let lockSolid = false;
  let hasScrolled = false;
  let allowScrollFade = false;

  const enableScrollFade = () => {
    allowScrollFade = true;
  };

  const applyBackground = (color) => {
    header.style.backgroundColor = color;
    if (nav) {
      nav.style.backgroundColor = color;
    }
  };

  header.style.transition = 'background-color 250ms ease';
  if (nav) {
    nav.style.transition = 'background-color 250ms ease';
  }
  applyBackground(solid);

  const scheduleSolid = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (!isHovering) {
        applyBackground(solid);
      }
    }, 1500);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!allowScrollFade) {
        return;
      }
      if (!hasScrolled) {
        hasScrolled = true;
        if (window.scrollY === 0) {
          return;
        }
      }
      lockSolid = false;
      lastScrollTime = Date.now();
      applyBackground(translucent);
      scheduleSolid();
    },
    { passive: true }
  );

  window.addEventListener('wheel', enableScrollFade, { passive: true });
  window.addEventListener('touchstart', enableScrollFade, { passive: true });
  window.addEventListener('keydown', enableScrollFade);
  window.addEventListener('pointerdown', enableScrollFade);
  window.addEventListener('mousedown', enableScrollFade);

  header.addEventListener('pointerenter', () => {
    isHovering = true;
    lockSolid = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    applyBackground(solid);
  });

  header.addEventListener('pointerleave', () => {
    isHovering = false;
    if (lockSolid) {
      applyBackground(solid);
      return;
    }
    if (Date.now() - lastScrollTime < 1500) {
      applyBackground(translucent);
      scheduleSolid();
    } else {
      applyBackground(solid);
    }
  });
};

const initSharedUI = async () => {
  await ensureBootstrapBundle();
  await injectIncludes();
  initScrollingHeader();
  initNavbarHoverDropdowns();
  normalizeNavLinks();
  highlightNav();
  initBootstrapHelpers();
};

const showAnnouncementModal = () => {
  const modalEl = document.getElementById('announcementModal');
  if (!modalEl || !window.bootstrap) return;
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

document.addEventListener('DOMContentLoaded', async () => {
  await initSharedUI();
  showAnnouncementModal();
});
