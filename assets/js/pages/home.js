(() => {
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
