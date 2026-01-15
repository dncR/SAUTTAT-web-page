// Configuration: adjust if the site is served from a different base path.
const defaultBase = () => (window.location.pathname.includes('/pages/') ? '..' : '.');
const STATIC_BASE = window.STATIC_BASE ?? defaultBase();

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
        el.innerHTML = html;
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

const initSharedUI = async () => {
  await ensureBootstrapBundle();
  await injectIncludes();
  normalizeNavLinks();
  highlightNav();
  initBootstrapHelpers();
};

document.addEventListener('DOMContentLoaded', () => {
  initSharedUI();
});
