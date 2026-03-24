(function () {
  const CAROUSEL_SELECTOR = '[data-gala-carousel]';
  const DEFAULT_INTERVAL = 3600;

  const initGalaCarousel = () => {
    if (!window.bootstrap?.Carousel) {
      console.error('Bootstrap Carousel is not available for gala-dinner page.');
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

  const runGalaDinnerPage = async () => {
    try {
      const waitForSharedUI = window.SAUTTAT?.waitForSharedUI;
      if (typeof waitForSharedUI !== 'function') {
        console.error('global_scripts.js must load before assets/js/pages/gala-dinner.js');
        return;
      }
      await waitForSharedUI();
      initGalaCarousel();
    } catch (error) {
      console.error(error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        void runGalaDinnerPage();
      },
      { once: true }
    );
  } else {
    void runGalaDinnerPage();
  }
})();
