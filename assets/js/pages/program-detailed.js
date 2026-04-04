(() => {
  const boot = async () => {
    if (!window.SAUTTAT?.waitForSharedUI) {
      console.warn('SAUTTAT.waitForSharedUI guard not found');
      return;
    }

    await window.SAUTTAT.waitForSharedUI();

    const buttons = Array.from(document.querySelectorAll('[data-program-switch]'));
    const panels = Array.from(document.querySelectorAll('[data-program-day]'));
    if (!buttons.length || !panels.length) return;

    const panelMap = new Map(panels.map((panel) => [panel.getAttribute('data-program-day'), panel]));

    const setActiveDay = (dayId) => {
      if (!panelMap.has(dayId)) return;

      panels.forEach((panel) => {
        const isActive = panel.getAttribute('data-program-day') === dayId;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      buttons.forEach((button) => {
        const isActive = button.getAttribute('data-program-switch') === dayId;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    };

    const activateFromHash = () => {
      const hashId = window.location.hash.replace('#', '');
      if (panelMap.has(hashId)) {
        setActiveDay(hashId);
      }
    };

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const dayId = button.getAttribute('data-program-switch');
        if (!dayId || !panelMap.has(dayId)) return;

        setActiveDay(dayId);
        history.replaceState(null, '', `#${dayId}`);
      });
    });

    window.addEventListener('hashchange', activateFromHash);
    activateFromHash();
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        void boot();
      },
      { once: true }
    );
  } else {
    void boot();
  }
})();
