(function () {
  const CAROUSEL_SELECTOR = '[data-social-carousel]';
  const DEFAULT_INTERVAL = 3200;

  const initSocialCarousel = () => {
    if (!window.bootstrap?.Carousel) {
      console.error('Bootstrap Carousel is not available for program-social page.');
      return;
    }

    document.querySelectorAll(CAROUSEL_SELECTOR).forEach((carouselEl) => {
      if (carouselEl.dataset.carouselReady === 'true') return;
      carouselEl.dataset.carouselReady = 'true';

      const interval = Number(carouselEl.getAttribute('data-bs-interval')) || DEFAULT_INTERVAL;
      bootstrap.Carousel.getOrCreateInstance(carouselEl, {
        interval,
        ride: 'carousel',
        pause: 'hover',
        touch: true,
        wrap: true,
      });
    });
  };

  const runProgramSocialPage = async () => {
    try {
      const waitForSharedUI = window.SAUTTAT?.waitForSharedUI;
      if (typeof waitForSharedUI !== 'function') {
        console.error('global_scripts.js must load before assets/js/pages/program-social.js');
        return;
      }
      await waitForSharedUI();
      initSocialCarousel();
    } catch (error) {
      console.error(error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        void runProgramSocialPage();
      },
      { once: true }
    );
  } else {
    void runProgramSocialPage();
  }
})();
