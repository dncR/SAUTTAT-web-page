(() => {
  const SPONSOR_TIER_ORDER = ['platin', 'gold', 'silver', 'bronze'];
  const AUTO_SCROLL_INTERVAL_MS = 3000;
  const AUTO_SCROLL_ANIMATION_MS = 520;

  const sponsorsState = {
    items: [],
    perSlide: 0,
    currentIndex: 0,
    resizeTimerId: null,
    autoTimerId: null,
    trackEl: null,
    transitionEndHandler: null,
    hoverTargetEl: null,
    hoverEnterHandler: null,
    hoverLeaveHandler: null,
    isHovered: false,
    nextAdvanceAt: 0,
    remainingDelayMs: AUTO_SCROLL_INTERVAL_MS
  };

  const normalizeText = (value, fallback = '') => {
    if (typeof value !== 'string') return fallback;
    const normalized = value.trim();
    return normalized || fallback;
  };

  const tierRank = (tierValue) => {
    const normalizedTier = normalizeText(tierValue).toLocaleLowerCase('tr-TR');
    const rank = SPONSOR_TIER_ORDER.indexOf(normalizedTier);
    return rank === -1 ? SPONSOR_TIER_ORDER.length : rank;
  };

  const getSponsorsPerSlide = () => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 1200;
    if (viewportWidth < 576) return 1;
    if (viewportWidth < 768) return 2;
    if (viewportWidth < 1200) return 3;
    if (viewportWidth < 1440) return 4;
    return 5;
  };

  const sortSponsorsByTierThenSourceOrder = (sponsors) =>
    sponsors
      .map((sponsor, originalIndex) => ({ sponsor, originalIndex }))
      .sort((left, right) => {
        const tierDifference = tierRank(left.sponsor.sponsorshipType) - tierRank(right.sponsor.sponsorshipType);
        if (tierDifference !== 0) return tierDifference;
        return left.originalIndex - right.originalIndex;
      })
      .map((entry) => entry.sponsor);

  const createStatusSlide = (message) => {
    const statusEl = document.createElement('div');
    statusEl.className = 'sponsors-carousel-status text-center text-muted py-4';
    statusEl.textContent = message;
    return statusEl;
  };

  const createSponsorLogoNode = (sponsor) => {
    const sponsorName = normalizeText(sponsor?.sponsorName, 'Sponsor');
    const logoFilePath = normalizeText(sponsor?.logoFilePath);
    const sponsorUrl = normalizeText(sponsor?.url, '');
    const sponsorshipType = normalizeText(sponsor?.sponsorshipType, 'Platin');

    if (!logoFilePath) return null;

    const itemTag = sponsorUrl ? 'a' : 'div';
    const itemEl = document.createElement(itemTag);
    itemEl.className = 'sponsor-logo-item';
    itemEl.setAttribute('data-sponsor-tier', sponsorshipType);

    if (sponsorUrl) {
      itemEl.href = sponsorUrl;
      itemEl.target = '_blank';
      itemEl.rel = 'noopener noreferrer';
      itemEl.setAttribute('aria-label', `${sponsorName} sponsor sayfasi`);
    }

    const imageEl = document.createElement('img');
    imageEl.className = 'sponsor-logo';
    imageEl.src = logoFilePath;
    imageEl.alt = `${sponsorName} logo`;
    imageEl.loading = 'lazy';
    imageEl.decoding = 'async';

    itemEl.appendChild(imageEl);
    return itemEl;
  };

  const clearSponsorsAutoScroll = () => {
    if (sponsorsState.autoTimerId) {
      window.clearTimeout(sponsorsState.autoTimerId);
      sponsorsState.autoTimerId = null;
    }
    if (sponsorsState.trackEl && sponsorsState.transitionEndHandler) {
      sponsorsState.trackEl.removeEventListener('transitionend', sponsorsState.transitionEndHandler);
      sponsorsState.transitionEndHandler = null;
    }
    if (sponsorsState.hoverTargetEl && sponsorsState.hoverEnterHandler && sponsorsState.hoverLeaveHandler) {
      sponsorsState.hoverTargetEl.removeEventListener('mouseenter', sponsorsState.hoverEnterHandler);
      sponsorsState.hoverTargetEl.removeEventListener('mouseleave', sponsorsState.hoverLeaveHandler);
    }
    sponsorsState.hoverTargetEl = null;
    sponsorsState.hoverEnterHandler = null;
    sponsorsState.hoverLeaveHandler = null;
    sponsorsState.isHovered = false;
    sponsorsState.nextAdvanceAt = 0;
    sponsorsState.remainingDelayMs = AUTO_SCROLL_INTERVAL_MS;
  };

  const resolveTrackGap = (trackEl) => {
    const styles = window.getComputedStyle(trackEl);
    const gapRaw = styles.columnGap || styles.gap || '16px';
    const gapValue = Number.parseFloat(gapRaw);
    return Number.isFinite(gapValue) ? gapValue : 16;
  };

  const applySponsorItemWidths = (trackEl, viewportEl, perSlide) => {
    const safePerSlide = Math.max(1, perSlide);
    const gap = resolveTrackGap(trackEl);
    const viewportWidth = viewportEl.clientWidth || trackEl.clientWidth || 0;
    const usableWidth = Math.max(1, viewportWidth - gap * (safePerSlide - 1));
    const itemWidth = usableWidth / safePerSlide;

    Array.from(trackEl.querySelectorAll('.sponsor-logo-item')).forEach((itemEl) => {
      itemEl.style.flex = `0 0 ${itemWidth}px`;
      itemEl.style.maxWidth = `${itemWidth}px`;
    });

    return itemWidth + gap;
  };

  const renderSponsorsCarousel = (sponsors, perSlide = getSponsorsPerSlide()) => {
    const carouselEl = document.getElementById('sponsorsCarousel');
    const viewportEl = carouselEl?.querySelector('[data-sponsors-carousel-viewport]');
    const trackEl = carouselEl?.querySelector('[data-sponsors-carousel-track]');
    if (!carouselEl || !viewportEl || !trackEl) return;

    clearSponsorsAutoScroll();
    sponsorsState.trackEl = trackEl;

    const sortedSponsors = sortSponsorsByTierThenSourceOrder(Array.isArray(sponsors) ? sponsors : []).filter(
      (sponsor) => Boolean(normalizeText(sponsor?.logoFilePath))
    );

    trackEl.innerHTML = '';

    if (!sortedSponsors.length) {
      trackEl.appendChild(createStatusSlide('Gosterilecek sponsor bulunamadi.'));
      return;
    }

    const visibleCount = Math.max(1, Math.min(perSlide, sortedSponsors.length));
    sponsorsState.perSlide = visibleCount;

    const shouldAutoScroll = sortedSponsors.length > visibleCount;
    const renderList = shouldAutoScroll
      ? sortedSponsors.concat(sortedSponsors.slice(0, visibleCount))
      : sortedSponsors;

    renderList.forEach((sponsor) => {
      const sponsorEl = createSponsorLogoNode(sponsor);
      if (sponsorEl) trackEl.appendChild(sponsorEl);
    });

    const stepPx = applySponsorItemWidths(trackEl, viewportEl, visibleCount);
    sponsorsState.currentIndex = 0;
    trackEl.style.transition = 'none';
    trackEl.style.transform = 'translateX(0px)';

    if (!shouldAutoScroll || stepPx <= 0) {
      return;
    }

    let isAnimating = false;
    const intervalMs = Number.parseInt(carouselEl.dataset.sponsorInterval || '', 10);
    const delayMs = Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : AUTO_SCROLL_INTERVAL_MS;
    sponsorsState.remainingDelayMs = delayMs;

    const onTransitionEnd = () => {
      if (sponsorsState.currentIndex >= sortedSponsors.length) {
        trackEl.style.transition = 'none';
        sponsorsState.currentIndex = 0;
        trackEl.style.transform = 'translateX(0px)';
        void trackEl.offsetWidth;
      }
      isAnimating = false;
    };

    sponsorsState.transitionEndHandler = onTransitionEnd;
    trackEl.addEventListener('transitionend', onTransitionEnd);

    const scheduleNextAdvance = (delay) => {
      const safeDelay = Math.max(0, Number.isFinite(delay) ? delay : delayMs);
      sponsorsState.nextAdvanceAt = Date.now() + safeDelay;
      sponsorsState.autoTimerId = window.setTimeout(() => {
        sponsorsState.autoTimerId = null;
        if (sponsorsState.isHovered) return;
        if (isAnimating) {
          scheduleNextAdvance(120);
          return;
        }
        sponsorsState.remainingDelayMs = delayMs;
        stepForward();
      }, safeDelay);
    };

    const stepForward = () => {
      if (isAnimating) return;
      isAnimating = true;
      sponsorsState.currentIndex += 1;
      trackEl.style.transition = `transform ${AUTO_SCROLL_ANIMATION_MS}ms ease`;
      trackEl.style.transform = `translateX(-${sponsorsState.currentIndex * stepPx}px)`;
      scheduleNextAdvance(delayMs);
    };

    sponsorsState.hoverTargetEl = viewportEl;
    sponsorsState.hoverEnterHandler = () => {
      sponsorsState.isHovered = true;
      if (sponsorsState.autoTimerId) {
        sponsorsState.remainingDelayMs = Math.max(0, sponsorsState.nextAdvanceAt - Date.now());
        window.clearTimeout(sponsorsState.autoTimerId);
        sponsorsState.autoTimerId = null;
      }
    };
    sponsorsState.hoverLeaveHandler = () => {
      sponsorsState.isHovered = false;
      if (!sponsorsState.autoTimerId) {
        scheduleNextAdvance(sponsorsState.remainingDelayMs || delayMs);
      }
    };

    viewportEl.addEventListener('mouseenter', sponsorsState.hoverEnterHandler);
    viewportEl.addEventListener('mouseleave', sponsorsState.hoverLeaveHandler);

    scheduleNextAdvance(delayMs);
  };

  const renderSponsorsError = (message) => {
    const carouselEl = document.getElementById('sponsorsCarousel');
    const trackEl = carouselEl?.querySelector('[data-sponsors-carousel-track]');
    if (!trackEl) return;
    clearSponsorsAutoScroll();
    trackEl.innerHTML = '';
    trackEl.appendChild(createStatusSlide(message));
  };

  const loadSponsors = async () => {
    const response = await fetch('assets/data/sponsors.json');
    if (!response.ok) {
      throw new Error(`Failed to load sponsors metadata: HTTP ${response.status}`);
    }
    const payload = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error('Sponsors metadata must be an array');
    }
    return payload;
  };

  const bindSponsorsResizeHandler = (carouselEl) => {
    if (!carouselEl || carouselEl.dataset.sponsorsResizeBound === 'true') return;
    carouselEl.dataset.sponsorsResizeBound = 'true';

    window.addEventListener(
      'resize',
      () => {
        if (sponsorsState.resizeTimerId) {
          clearTimeout(sponsorsState.resizeTimerId);
        }
        sponsorsState.resizeTimerId = window.setTimeout(() => {
          if (!sponsorsState.items.length) return;
          sponsorsState.perSlide = getSponsorsPerSlide();
          renderSponsorsCarousel(sponsorsState.items, sponsorsState.perSlide);
        }, 160);
      },
      { passive: true }
    );
  };

  const initSponsorsCarousel = async () => {
    const carouselEl = document.getElementById('sponsorsCarousel');
    const trackEl = carouselEl?.querySelector('[data-sponsors-carousel-track]');
    if (!carouselEl || !trackEl) return;
    if (carouselEl.dataset.sponsorsInit === 'true') return;

    carouselEl.dataset.sponsorsInit = 'true';

    try {
      const sponsors = await loadSponsors();
      sponsorsState.items = sponsors;
      sponsorsState.perSlide = getSponsorsPerSlide();
      renderSponsorsCarousel(sponsorsState.items, sponsorsState.perSlide);
      bindSponsorsResizeHandler(carouselEl);
    } catch (err) {
      console.error(err);
      sponsorsState.items = [];
      renderSponsorsError('Sponsorlar yuklenemedi.');
    }
  };

  const showAnnouncementModal = () => {
    const modalEl = document.getElementById('announcementModal');
    if (!modalEl || !window.bootstrap) return;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  };

  const runHomeScripts = async () => {
    try {
      const waitForSharedUI = window.SAUTTAT?.waitForSharedUI;
      if (typeof waitForSharedUI !== 'function') {
        console.error('global_scripts.js must load before assets/js/pages/home.js');
        return;
      }
      await waitForSharedUI();
      await initSponsorsCarousel();
      showAnnouncementModal();
    } catch (err) {
      console.error(err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        void runHomeScripts();
      },
      { once: true }
    );
  } else {
    void runHomeScripts();
  }
})();
