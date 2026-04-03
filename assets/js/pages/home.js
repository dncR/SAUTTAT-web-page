(() => {
  const SPONSOR_TIER_ORDER = ['platin', 'gold', 'silver', 'bronze'];
  const AUTO_SCROLL_INTERVAL_MS = 3000;
  const AUTO_SCROLL_ANIMATION_MS = 520;
  const CONGRESS_START_AT = '2026-05-08T09:00:00+03:00';
  const SECOND_MS = 1000;
  const MINUTE_MS = 60 * SECOND_MS;
  const HOUR_MS = 60 * MINUTE_MS;
  const DAY_MS = 24 * HOUR_MS;

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
  const countdownState = {
    timerId: null,
    refs: null
  };

  const normalizeText = (value, fallback = '') => {
    if (typeof value !== 'string') return fallback;
    const normalized = value.trim();
    return normalized || fallback;
  };

  const padCounter = (value) => String(Math.max(0, value)).padStart(2, '0');

  const resolveCountdownParts = (remainingMs) => {
    const safeMs = Math.max(0, remainingMs);
    const days = Math.floor(safeMs / DAY_MS);
    const hours = Math.floor((safeMs % DAY_MS) / HOUR_MS);
    const minutes = Math.floor((safeMs % HOUR_MS) / MINUTE_MS);
    const seconds = Math.floor((safeMs % MINUTE_MS) / SECOND_MS);
    return { days, hours, minutes, seconds };
  };

  const createCountdownMarkup = (rootEl) => {
    rootEl.innerHTML = `
      <div class="countdown-strip">
        <div class="countdown-segment">
          <span class="countdown-number" data-countdown-days>00</span>
          <span class="countdown-segment-label">Gün</span>
        </div>
        <span class="countdown-separator" aria-hidden="true">:</span>
        <div class="countdown-segment">
          <span class="countdown-number" data-countdown-hours>00</span>
          <span class="countdown-segment-label">Saat</span>
        </div>
        <span class="countdown-separator" aria-hidden="true">:</span>
        <div class="countdown-segment">
          <span class="countdown-number" data-countdown-minutes>00</span>
          <span class="countdown-segment-label">Dakika</span>
        </div>
        <span class="countdown-separator" aria-hidden="true">:</span>
        <div class="countdown-segment">
          <span class="countdown-number" data-countdown-seconds>00</span>
          <span class="countdown-segment-label">Saniye</span>
        </div>
      </div>
    `;

    return {
      days: rootEl.querySelector('[data-countdown-days]'),
      hours: rootEl.querySelector('[data-countdown-hours]'),
      minutes: rootEl.querySelector('[data-countdown-minutes]'),
      seconds: rootEl.querySelector('[data-countdown-seconds]')
    };
  };

  const renderCountdown = (remainingMs) => {
    if (!countdownState.refs) return;
    const { days, hours, minutes, seconds } = resolveCountdownParts(remainingMs);
    countdownState.refs.days.textContent = padCounter(days);
    countdownState.refs.hours.textContent = padCounter(hours);
    countdownState.refs.minutes.textContent = padCounter(minutes);
    countdownState.refs.seconds.textContent = padCounter(seconds);
  };

  const initCountdown = () => {
    const countdownEl = document.querySelector('[data-congress-countdown]');
    const rootEl = countdownEl?.querySelector('[data-countdown-root]');
    if (!countdownEl || !rootEl) return;

    const targetRaw = normalizeText(countdownEl.dataset.targetDate, CONGRESS_START_AT);
    const targetTimestamp = Date.parse(targetRaw);
    if (!Number.isFinite(targetTimestamp)) {
      console.error(`Invalid countdown target date: "${targetRaw}"`);
      return;
    }

    countdownState.refs = createCountdownMarkup(rootEl);
    if (!countdownState.refs.days || !countdownState.refs.hours || !countdownState.refs.minutes || !countdownState.refs.seconds) {
      console.error('Countdown render refs are missing.');
      return;
    }

    const tick = () => {
      const remainingMs = targetTimestamp - Date.now();
      renderCountdown(remainingMs);
      if (remainingMs <= 0 && countdownState.timerId) {
        window.clearInterval(countdownState.timerId);
        countdownState.timerId = null;
      }
    };

    tick();
    if (countdownState.timerId) {
      window.clearInterval(countdownState.timerId);
    }
    countdownState.timerId = window.setInterval(tick, SECOND_MS);
  };

  const normalizeSponsorTier = (tierValue) => {
    const normalizedTier = normalizeText(tierValue, '').toLocaleLowerCase('tr-TR');
    return normalizedTier || null;
  };

  const resolveSponsorTierMeta = (tierValue) => {
    if (tierValue === null || tierValue === undefined) {
      return { group: 2, rank: SPONSOR_TIER_ORDER.length, normalizedTier: null };
    }

    const normalizedTier = normalizeSponsorTier(tierValue);
    if (!normalizedTier) {
      return { group: 2, rank: SPONSOR_TIER_ORDER.length, normalizedTier: null };
    }

    const knownRank = SPONSOR_TIER_ORDER.indexOf(normalizedTier);
    if (knownRank !== -1) {
      return { group: 0, rank: knownRank, normalizedTier };
    }

    return { group: 1, rank: SPONSOR_TIER_ORDER.length, normalizedTier };
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
      .map((sponsor, originalIndex) => ({
        sponsor,
        originalIndex,
        tierMeta: resolveSponsorTierMeta(sponsor?.sponsorshipType)
      }))
      .sort((left, right) => {
        if (left.tierMeta.group !== right.tierMeta.group) {
          return left.tierMeta.group - right.tierMeta.group;
        }
        if (left.tierMeta.rank !== right.tierMeta.rank) {
          return left.tierMeta.rank - right.tierMeta.rank;
        }
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
    const sponsorshipType = normalizeSponsorTier(sponsor?.sponsorshipType) || 'unspecified';

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
      initCountdown();
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
