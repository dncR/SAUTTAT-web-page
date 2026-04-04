(() => {
  const SPONSOR_TIER_ORDER = ['platin', 'gold', 'silver', 'bronze'];
  const SPONSOR_FALLBACK_TIER = 'unspecified';
  const SITE_CONFIG_PATH = 'site.config.json';
  const DEFAULT_SPLIT_SPONSORS_CAROUSEL = false;
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
    splitMode: DEFAULT_SPLIT_SPONSORS_CAROUSEL,
    resizeTimerId: null,
    isResizeBound: false,
    combinedController: null,
    tierControllers: []
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

  const resolveSponsorTierKey = (tierValue) => normalizeSponsorTier(tierValue) || SPONSOR_FALLBACK_TIER;

  const formatSponsorTierLabel = (tierKey) => {
    if (tierKey === 'platin') return 'PLATİN';
    if (tierKey === 'gold') return 'ALTIN';
    if (tierKey === 'silver') return 'GÜMÜŞ';
    if (tierKey === 'bronze') return 'BRONZ';
    if (tierKey === SPONSOR_FALLBACK_TIER) return 'DESTEK SPONSORLARI';

    const normalizedKey = normalizeText(tierKey, '').replace(/[_-]+/g, ' ');
    if (!normalizedKey) return 'DİĞER SPONSORLAR';
    return normalizedKey
      .split(/\s+/)
      .map((word) => {
        if (!word) return '';
        const firstChar = word.charAt(0).toLocaleUpperCase('tr-TR');
        return `${firstChar}${word.slice(1)}`;
      })
      .join(' ');
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

  const collectSponsorsByTier = (sponsors) => {
    const tierMap = new Map();
    (Array.isArray(sponsors) ? sponsors : []).forEach((sponsor) => {
      if (!normalizeText(sponsor?.logoFilePath)) return;
      const tierKey = resolveSponsorTierKey(sponsor?.sponsorshipType);
      if (!tierMap.has(tierKey)) {
        tierMap.set(tierKey, []);
      }
      tierMap.get(tierKey).push(sponsor);
    });
    return tierMap;
  };

  const resolveTierRenderOrder = (tierMap) => {
    const knownOrder = SPONSOR_TIER_ORDER.filter((tierKey) => tierMap.has(tierKey));
    const unknownOrder = Array.from(tierMap.keys())
      .filter((tierKey) => !SPONSOR_TIER_ORDER.includes(tierKey) && tierKey !== SPONSOR_FALLBACK_TIER)
      .sort((left, right) => left.localeCompare(right, 'tr'));
    const fallbackOrder = tierMap.has(SPONSOR_FALLBACK_TIER) ? [SPONSOR_FALLBACK_TIER] : [];
    return knownOrder.concat(unknownOrder, fallbackOrder);
  };

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
    const sponsorshipType = resolveSponsorTierKey(sponsor?.sponsorshipType);
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

  const createCarouselRuntimeState = () => ({
    currentIndex: 0,
    autoTimerId: null,
    trackEl: null,
    transitionEndHandler: null,
    hoverTargetEl: null,
    hoverEnterHandler: null,
    hoverLeaveHandler: null,
    isHovered: false,
    nextAdvanceAt: 0,
    remainingDelayMs: AUTO_SCROLL_INTERVAL_MS
  });

  const createCarouselController = ({ carouselEl, viewportEl, trackEl, fillWhenFew }) => ({
    carouselEl,
    viewportEl,
    trackEl,
    fillWhenFew: Boolean(fillWhenFew),
    state: createCarouselRuntimeState()
  });

  const clearCarouselAutoScroll = (runtimeState) => {
    if (!runtimeState) return;

    if (runtimeState.autoTimerId) {
      window.clearTimeout(runtimeState.autoTimerId);
      runtimeState.autoTimerId = null;
    }
    if (runtimeState.trackEl && runtimeState.transitionEndHandler) {
      runtimeState.trackEl.removeEventListener('transitionend', runtimeState.transitionEndHandler);
      runtimeState.transitionEndHandler = null;
    }
    if (runtimeState.hoverTargetEl && runtimeState.hoverEnterHandler && runtimeState.hoverLeaveHandler) {
      runtimeState.hoverTargetEl.removeEventListener('mouseenter', runtimeState.hoverEnterHandler);
      runtimeState.hoverTargetEl.removeEventListener('mouseleave', runtimeState.hoverLeaveHandler);
    }

    runtimeState.hoverTargetEl = null;
    runtimeState.hoverEnterHandler = null;
    runtimeState.hoverLeaveHandler = null;
    runtimeState.isHovered = false;
    runtimeState.nextAdvanceAt = 0;
    runtimeState.remainingDelayMs = AUTO_SCROLL_INTERVAL_MS;
  };

  const resolveTrackGap = (trackEl) => {
    const styles = window.getComputedStyle(trackEl);
    const gapRaw = styles.columnGap || styles.gap || '16px';
    const gapValue = Number.parseFloat(gapRaw);
    return Number.isFinite(gapValue) ? gapValue : 16;
  };

  const applySponsorItemWidths = (trackEl, viewportEl, slotsPerView) => {
    const safeSlots = Math.max(1, slotsPerView);
    const gap = resolveTrackGap(trackEl);
    const viewportWidth = viewportEl.clientWidth || trackEl.clientWidth || 0;
    const usableWidth = Math.max(1, viewportWidth - gap * (safeSlots - 1));
    const itemWidth = usableWidth / safeSlots;

    Array.from(trackEl.querySelectorAll('.sponsor-logo-item')).forEach((itemEl) => {
      itemEl.style.flex = `0 0 ${itemWidth}px`;
      itemEl.style.maxWidth = `${itemWidth}px`;
    });

    return itemWidth + gap;
  };

  const renderCarouselStatus = (controller, message) => {
    if (!controller?.trackEl) return;
    clearCarouselAutoScroll(controller.state);
    controller.trackEl.innerHTML = '';
    controller.trackEl.appendChild(createStatusSlide(message));
  };

  const renderCarousel = (controller, sponsors, perSlide = getSponsorsPerSlide()) => {
    const carouselEl = controller?.carouselEl;
    const viewportEl = controller?.viewportEl;
    const trackEl = controller?.trackEl;
    const runtimeState = controller?.state;
    if (!carouselEl || !viewportEl || !trackEl || !runtimeState) return;

    clearCarouselAutoScroll(runtimeState);
    runtimeState.trackEl = trackEl;

    const validSponsors = (Array.isArray(sponsors) ? sponsors : []).filter((sponsor) => Boolean(normalizeText(sponsor?.logoFilePath)));
    trackEl.innerHTML = '';

    if (!validSponsors.length) {
      trackEl.appendChild(createStatusSlide('Gosterilecek sponsor bulunamadi.'));
      return;
    }

    const slotsPerView = controller.fillWhenFew
      ? Math.max(1, Math.min(perSlide, validSponsors.length))
      : Math.max(1, perSlide);
    const shouldAutoScroll = validSponsors.length > slotsPerView;
    const renderList = shouldAutoScroll
      ? validSponsors.concat(validSponsors.slice(0, slotsPerView))
      : validSponsors;

    renderList.forEach((sponsor) => {
      const sponsorEl = createSponsorLogoNode(sponsor);
      if (sponsorEl) trackEl.appendChild(sponsorEl);
    });

    const stepPx = applySponsorItemWidths(trackEl, viewportEl, slotsPerView);
    runtimeState.currentIndex = 0;
    trackEl.style.transition = 'none';
    trackEl.style.transform = 'translateX(0px)';

    if (!shouldAutoScroll || stepPx <= 0) {
      return;
    }

    let isAnimating = false;
    const intervalMs = Number.parseInt(carouselEl.dataset.sponsorInterval || '', 10);
    const delayMs = Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : AUTO_SCROLL_INTERVAL_MS;
    runtimeState.remainingDelayMs = delayMs;

    const onTransitionEnd = () => {
      if (runtimeState.currentIndex >= validSponsors.length) {
        trackEl.style.transition = 'none';
        runtimeState.currentIndex = 0;
        trackEl.style.transform = 'translateX(0px)';
        void trackEl.offsetWidth;
      }
      isAnimating = false;
    };

    runtimeState.transitionEndHandler = onTransitionEnd;
    trackEl.addEventListener('transitionend', onTransitionEnd);

    const scheduleNextAdvance = (delay) => {
      const safeDelay = Math.max(0, Number.isFinite(delay) ? delay : delayMs);
      runtimeState.nextAdvanceAt = Date.now() + safeDelay;
      runtimeState.autoTimerId = window.setTimeout(() => {
        runtimeState.autoTimerId = null;
        if (runtimeState.isHovered) return;
        if (isAnimating) {
          scheduleNextAdvance(120);
          return;
        }
        runtimeState.remainingDelayMs = delayMs;
        stepForward();
      }, safeDelay);
    };

    const stepForward = () => {
      if (isAnimating) return;
      isAnimating = true;
      runtimeState.currentIndex += 1;
      trackEl.style.transition = `transform ${AUTO_SCROLL_ANIMATION_MS}ms ease`;
      trackEl.style.transform = `translateX(-${runtimeState.currentIndex * stepPx}px)`;
      scheduleNextAdvance(delayMs);
    };

    runtimeState.hoverTargetEl = viewportEl;
    runtimeState.hoverEnterHandler = () => {
      runtimeState.isHovered = true;
      if (runtimeState.autoTimerId) {
        runtimeState.remainingDelayMs = Math.max(0, runtimeState.nextAdvanceAt - Date.now());
        window.clearTimeout(runtimeState.autoTimerId);
        runtimeState.autoTimerId = null;
      }
    };
    runtimeState.hoverLeaveHandler = () => {
      runtimeState.isHovered = false;
      if (!runtimeState.autoTimerId) {
        scheduleNextAdvance(runtimeState.remainingDelayMs || delayMs);
      }
    };

    viewportEl.addEventListener('mouseenter', runtimeState.hoverEnterHandler);
    viewportEl.addEventListener('mouseleave', runtimeState.hoverLeaveHandler);
    scheduleNextAdvance(delayMs);
  };

  const getCombinedCarouselRefs = () => {
    const carouselEl = document.getElementById('sponsorsCarousel');
    const viewportEl = carouselEl?.querySelector('[data-sponsors-carousel-viewport]');
    const trackEl = carouselEl?.querySelector('[data-sponsors-carousel-track]');
    if (!carouselEl || !viewportEl || !trackEl) return null;
    return { carouselEl, viewportEl, trackEl };
  };

  const ensureCombinedController = () => {
    const refs = getCombinedCarouselRefs();
    if (!refs) {
      sponsorsState.combinedController = null;
      return null;
    }

    const existing = sponsorsState.combinedController;
    if (existing?.carouselEl === refs.carouselEl && existing?.trackEl === refs.trackEl && existing?.viewportEl === refs.viewportEl) {
      return existing;
    }

    if (existing) {
      clearCarouselAutoScroll(existing.state);
    }

    sponsorsState.combinedController = createCarouselController({
      carouselEl: refs.carouselEl,
      viewportEl: refs.viewportEl,
      trackEl: refs.trackEl,
      fillWhenFew: true
    });
    return sponsorsState.combinedController;
  };

  const clearTierCarousels = () => {
    sponsorsState.tierControllers.forEach((controller) => {
      clearCarouselAutoScroll(controller.state);
    });
    sponsorsState.tierControllers = [];
  };

  const getTierGroupsElement = () => document.querySelector('[data-sponsors-by-tier] [data-sponsor-tier-groups]');

  const createTierGroupElement = (tierKey, sponsors) => {
    const groupEl = document.createElement('article');
    groupEl.className = 'sponsor-tier-group';
    groupEl.setAttribute('data-sponsor-tier-group', tierKey);

    const headEl = document.createElement('div');
    headEl.className = 'sponsor-tier-group-head';

    const titleEl = document.createElement('h3');
    titleEl.className = 'sponsor-tier-group-title';
    titleEl.textContent = formatSponsorTierLabel(tierKey);

    const countEl = document.createElement('span');
    countEl.className = 'sponsor-tier-group-count';
    countEl.textContent = `${sponsors.length} sponsor`;

    headEl.appendChild(titleEl);
    headEl.appendChild(countEl);

    const carouselEl = document.createElement('div');
    carouselEl.className = 'sponsors-carousel sponsors-carousel--tier';
    carouselEl.dataset.sponsorInterval = '3000';

    const viewportEl = document.createElement('div');
    viewportEl.className = 'sponsors-carousel-viewport';

    const trackEl = document.createElement('div');
    trackEl.className = 'sponsors-carousel-track';

    viewportEl.appendChild(trackEl);
    carouselEl.appendChild(viewportEl);

    groupEl.appendChild(headEl);
    groupEl.appendChild(carouselEl);

    return { groupEl, carouselEl, viewportEl, trackEl };
  };

  const renderCombinedSponsors = (sponsors, perSlide = getSponsorsPerSlide()) => {
    const controller = ensureCombinedController();
    if (!controller) return;

    const sortedSponsors = sortSponsorsByTierThenSourceOrder(Array.isArray(sponsors) ? sponsors : []);
    renderCarousel(controller, sortedSponsors, perSlide);
  };

  const renderSponsorsByTier = (sponsors, perSlide = getSponsorsPerSlide()) => {
    const groupsEl = getTierGroupsElement();
    if (!groupsEl) return;

    const canReuseTierControllers =
      sponsorsState.tierControllers.length > 0 &&
      sponsorsState.tierControllers.every(
        (controller) => Boolean(controller?.trackEl) && document.body.contains(controller.trackEl)
      );

    if (canReuseTierControllers) {
      sponsorsState.tierControllers.forEach((controller) => {
        renderCarousel(controller, controller.items, perSlide);
      });
      return;
    }

    clearTierCarousels();
    groupsEl.innerHTML = '';

    const tierMap = collectSponsorsByTier(sponsors);
    const renderOrder = resolveTierRenderOrder(tierMap);
    if (!renderOrder.length) {
      groupsEl.appendChild(createStatusSlide('Gosterilecek sponsor bulunamadi.'));
      return;
    }

    renderOrder.forEach((tierKey) => {
      const tierSponsors = tierMap.get(tierKey) || [];
      const { groupEl, carouselEl, viewportEl, trackEl } = createTierGroupElement(tierKey, tierSponsors);
      groupsEl.appendChild(groupEl);

      const controller = createCarouselController({
        carouselEl,
        viewportEl,
        trackEl,
        fillWhenFew: false
      });
      controller.items = tierSponsors;
      sponsorsState.tierControllers.push(controller);
      renderCarousel(controller, tierSponsors, perSlide);
    });
  };

  const renderSponsorsByTierError = (message) => {
    const groupsEl = getTierGroupsElement();
    if (!groupsEl) return;
    clearTierCarousels();
    groupsEl.innerHTML = '';
    groupsEl.appendChild(createStatusSlide(message));
  };

  const renderCombinedSponsorsError = (message) => {
    const controller = ensureCombinedController();
    renderCarouselStatus(controller, message);
  };

  const setSectionVisibility = (sectionEl, isVisible) => {
    if (!sectionEl) return;
    sectionEl.classList.toggle('d-none', !isVisible);
    if (isVisible) {
      sectionEl.removeAttribute('hidden');
      sectionEl.setAttribute('aria-hidden', 'false');
      return;
    }
    sectionEl.setAttribute('hidden', 'hidden');
    sectionEl.setAttribute('aria-hidden', 'true');
  };

  const applySponsorsLayoutVisibility = () => {
    const combinedSectionEl = document.querySelector('.sponsors-section');
    const splitSectionEl = document.querySelector('[data-sponsors-by-tier]');
    setSectionVisibility(combinedSectionEl, !sponsorsState.splitMode);
    setSectionVisibility(splitSectionEl, sponsorsState.splitMode);
  };

  const resolveEffectiveSplitMode = (requestedSplitMode) => {
    const hasCombined = Boolean(getCombinedCarouselRefs());
    const hasSplit = Boolean(getTierGroupsElement());

    if (!hasCombined && !hasSplit) {
      return false;
    }
    if (requestedSplitMode && hasSplit) {
      return true;
    }
    if (!requestedSplitMode && hasCombined) {
      return false;
    }
    if (hasSplit && !hasCombined) {
      return true;
    }
    return false;
  };

  const normalizeSiteConfig = (payload) => ({
    splitSponsorsCarousel: Boolean(payload?.splitSponsorsCarousel)
  });

  const loadSiteConfig = async () => {
    try {
      const response = await fetch(SITE_CONFIG_PATH, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load site config: HTTP ${response.status}`);
      }
      const payload = await response.json();
      if (!payload || typeof payload !== 'object') {
        throw new Error('site.config.json must be an object');
      }
      return normalizeSiteConfig(payload);
    } catch (err) {
      console.warn('Using default sponsor layout mode because site config could not be loaded.', err);
      return {
        splitSponsorsCarousel: DEFAULT_SPLIT_SPONSORS_CAROUSEL
      };
    }
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

  const renderActiveSponsors = () => {
    if (!sponsorsState.items.length) return;

    if (sponsorsState.splitMode) {
      const combinedController = sponsorsState.combinedController;
      if (combinedController) {
        clearCarouselAutoScroll(combinedController.state);
      }
      renderSponsorsByTier(sponsorsState.items, sponsorsState.perSlide);
      return;
    }

    clearTierCarousels();
    renderCombinedSponsors(sponsorsState.items, sponsorsState.perSlide);
  };

  const renderActiveSponsorsError = (message) => {
    if (sponsorsState.splitMode) {
      renderSponsorsByTierError(message);
      return;
    }
    clearTierCarousels();
    renderCombinedSponsorsError(message);
  };

  const bindSponsorsResizeHandler = () => {
    if (sponsorsState.isResizeBound) return;
    sponsorsState.isResizeBound = true;

    window.addEventListener(
      'resize',
      () => {
        if (sponsorsState.resizeTimerId) {
          clearTimeout(sponsorsState.resizeTimerId);
        }
        sponsorsState.resizeTimerId = window.setTimeout(() => {
          if (!sponsorsState.items.length) return;
          sponsorsState.perSlide = getSponsorsPerSlide();
          renderActiveSponsors();
        }, 160);
      },
      { passive: true }
    );
  };

  const initSponsorsLayout = async () => {
    const hasCombined = Boolean(getCombinedCarouselRefs());
    const hasSplit = Boolean(getTierGroupsElement());
    if (!hasCombined && !hasSplit) return;

    const rootEl = document.documentElement;
    if (rootEl.dataset.sponsorsLayoutInit === 'true') return;
    rootEl.dataset.sponsorsLayoutInit = 'true';

    try {
      const [siteConfig, sponsors] = await Promise.all([loadSiteConfig(), loadSponsors()]);
      sponsorsState.items = sponsors;
      sponsorsState.perSlide = getSponsorsPerSlide();
      sponsorsState.splitMode = resolveEffectiveSplitMode(siteConfig.splitSponsorsCarousel);

      applySponsorsLayoutVisibility();
      renderActiveSponsors();
      bindSponsorsResizeHandler();
    } catch (err) {
      console.error(err);
      sponsorsState.items = [];
      sponsorsState.splitMode = resolveEffectiveSplitMode(DEFAULT_SPLIT_SPONSORS_CAROUSEL);
      applySponsorsLayoutVisibility();
      renderActiveSponsorsError('Sponsorlar yuklenemedi.');
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
      await initSponsorsLayout();
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
