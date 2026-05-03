(function () {
  const DATA_PATH = 'assets/data/konusmacilar.json';
  const LIST_CONTAINER_ID = 'speakersList';
  const DETAIL_CONTAINER_ID = 'speakerDetail';
  const EMPTY_ALERT_CLASS = 'alert alert-warning';
  const FALLBACK_IMAGE = 'assets/img/static/icerik_hazirlaniyor.png';

  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const normalizeText = (value) => String(value ?? '').trim();

  const resolveHideValue = (value) => {
    if (value === true || value === false) return value;
    if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
    if (typeof value === 'number') return value === 1;
    return false;
  };

  const isSpeakerHidden = (speaker) => resolveHideValue(speaker?.hide);

  const normalizeDescription = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => normalizeText(item)).filter(Boolean);
    }
    const single = normalizeText(value);
    return single ? [single] : [];
  };

  const buildDisplayName = (academicTitle, fullName) =>
    [normalizeText(academicTitle), normalizeText(fullName)].filter(Boolean).join(' ').trim();

  const buildTimeLabel = (timeLabel, startTime, endTime) => {
    const label = normalizeText(timeLabel);
    if (label) return label;
    const start = normalizeText(startTime);
    const end = normalizeText(endTime);
    if (!start && !end) return '';
    return [start, end].filter(Boolean).join(' - ');
  };

  const normalizeRecord = (raw) => {
    const id = normalizeText(raw?.id);
    const academicTitle = normalizeText(raw?.speaker?.academicTitle);
    const fullName = normalizeText(raw?.speaker?.fullName);
    const displayName = buildDisplayName(academicTitle, fullName) || fullName;
    const dateIso = normalizeText(raw?.session?.dateIso);
    const startTime = normalizeText(raw?.session?.startTime);

    return {
      id,
      hide: isSpeakerHidden(raw),
      talk: {
        title: normalizeText(raw?.talk?.title),
        description: normalizeDescription(raw?.talk?.description),
      },
      speaker: {
        fullName,
        academicTitle,
        displayName,
        institution: normalizeText(raw?.speaker?.institution),
        image: normalizeText(raw?.speaker?.image) || FALLBACK_IMAGE,
      },
      session: {
        dateLabel: normalizeText(raw?.session?.dateLabel),
        dateIso,
        startTime,
        endTime: normalizeText(raw?.session?.endTime),
        timeLabel: buildTimeLabel(raw?.session?.timeLabel, raw?.session?.startTime, raw?.session?.endTime),
        venue: normalizeText(raw?.session?.venue),
      },
      sortKey: `${dateIso || '9999-12-31'}T${startTime || '99:99'}`,
    };
  };

  const normalizeData = (raw) => {
    const records = Array.isArray(raw?.records) ? raw.records : [];
    return records
      .map((item) => normalizeRecord(item))
      .filter((item) => !item.hide && item.id && item.speaker.fullName && item.talk.title);
  };

  const sortRecords = (records) =>
    [...records].sort((a, b) => {
      const bySession = a.sortKey.localeCompare(b.sortKey, 'tr');
      if (bySession !== 0) return bySession;
      return a.speaker.fullName.localeCompare(b.speaker.fullName, 'tr');
    });

  const renderList = (container, records) => {
    if (!records.length) {
      container.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Konuşmacı bilgisi bulunamadı.</div>`;
      return;
    }

    container.innerHTML = records
      .map((record) => {
        const datePart = record.session.dateLabel ? escapeHtml(record.session.dateLabel) : '';
        const timePart = record.session.timeLabel ? escapeHtml(record.session.timeLabel) : '';
        const institution = record.speaker.institution;
        const sessionMeta = `
          <div class="speakers-card-session d-flex align-items-center gap-2 flex-wrap mb-3">
            ${datePart ? `<span class="speakers-card-badge"><i class="fa-regular fa-calendar-days" aria-hidden="true"></i><span>${datePart}</span></span>` : ''}
            ${timePart ? `<span class="speakers-card-badge"><i class="fa-regular fa-clock" aria-hidden="true"></i><span>${timePart}</span></span>` : ''}
          </div>
        `;

        return `
          <div class="col-12 col-md-6 col-xl-4">
            <article class="speakers-card h-100">
              <img class="speakers-card-image" src="${escapeHtml(record.speaker.image)}" alt="${escapeHtml(record.speaker.displayName)}">
              <div class="speakers-card-body d-flex flex-column">
                ${sessionMeta}
                <h2 class="speakers-card-title h5 fw-bold mb-2">${escapeHtml(record.talk.title)}</h2>
                <p class="speakers-card-speaker">${escapeHtml(record.speaker.displayName)}</p>
                <p class="speakers-card-meta mb-3">${escapeHtml(institution)}</p>
                <a class="btn btn-sm btn-outline-primary mt-auto align-self-start" href="pages/konusmaci-detay.html?id=${encodeURIComponent(record.id)}">Detaya Git</a>
              </div>
            </article>
          </div>
        `;
      })
      .join('');
  };

  const renderDetail = (container, record) => {
    if (!record) {
      container.innerHTML = `
        <div class="${EMPTY_ALERT_CLASS}" role="alert">
          Aradığınız konuşmacı bulunamadı.
          <a class="alert-link ms-2" href="pages/speakers.html">Konuşmacılar sayfasına dön</a>
        </div>
      `;
      return;
    }

    const metaItems = [
      record.speaker.institution ? `<li><strong>Kurum:</strong> ${escapeHtml(record.speaker.institution)}</li>` : '',
      record.session.dateLabel ? `<li><strong>Tarih:</strong> ${escapeHtml(record.session.dateLabel)}</li>` : '',
      record.session.timeLabel ? `<li><strong>Saat:</strong> ${escapeHtml(record.session.timeLabel)}</li>` : '',
      record.session.venue ? `<li><strong>Yer:</strong> ${escapeHtml(record.session.venue)}</li>` : '',
    ]
      .filter(Boolean)
      .join('');

    const description = record.talk.description.length
      ? record.talk.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')
      : '<p>Açıklama bilgisi henüz eklenmedi.</p>';

    container.innerHTML = `
      <div class="row g-4 align-items-center mb-4 speakers-detail-row">
        <div class="col-xl-4 col-lg-5">
          <div class="speakers-detail-media-wrap">
            <img class="speakers-detail-avatar" src="${escapeHtml(record.speaker.image)}" alt="${escapeHtml(record.speaker.displayName)}">
          </div>
        </div>
        <div class="col-xl-8 col-lg-7">
          <article class="speakers-detail-card speakers-detail-kunye">
            <h1 class="speakers-detail-title fw-bold mb-2">${escapeHtml(record.talk.title)}</h1>
            <p class="speakers-detail-speaker fw-semibold mb-3">${escapeHtml(record.speaker.displayName)}</p>
            <ul class="speakers-detail-list list-unstyled mb-0">${metaItems}</ul>
          </article>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <article class="speakers-detail-card speakers-detail-description-card">
            <h2 class="h4 fw-bold mb-3 speakers-detail-section-title">Hakkında</h2>
            <div class="speakers-detail-description mb-4">${description}</div>
            <a class="btn btn-outline-primary" href="pages/speakers.html">Tüm Konuşmacılar</a>
          </article>
        </div>
      </div>
    `;

    document.title = `${record.speaker.displayName} | Konuşmacı Detayı | SAUTTAT 2026`;
  };

  const setSpeakersNavActive = () => {
    let retries = 0;
    const maxRetries = 20;
    const tick = () => {
      const links = document.querySelectorAll('[data-nav-match="speakers"]');
      if (!links.length && retries < maxRetries) {
        retries += 1;
        window.setTimeout(tick, 100);
        return;
      }

      links.forEach((link) => {
        link.classList.add('active');
        const dropdownToggle = link.closest('.dropdown')?.querySelector('.dropdown-toggle');
        if (dropdownToggle) dropdownToggle.classList.add('active');
      });
    };
    tick();
  };

  const fetchSpeakers = async () => {
    const response = await fetch(DATA_PATH);
    if (!response.ok) throw new Error('Konuşmacı verisi yüklenemedi.');
    const raw = await response.json();
    return sortRecords(normalizeData(raw));
  };

  const initSpeakersPages = async () => {
    const listContainer = document.getElementById(LIST_CONTAINER_ID);
    const detailContainer = document.getElementById(DETAIL_CONTAINER_ID);
    if (!listContainer && !detailContainer) return;

    try {
      const records = await fetchSpeakers();
      if (listContainer) {
        renderList(listContainer, records);
      }
      if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const id = normalizeText(params.get('id'));
        const record = records.find((item) => item.id === id);
        renderDetail(detailContainer, record);
        setSpeakersNavActive();
      }
    } catch (error) {
      console.error(error);
      if (listContainer) {
        listContainer.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Konuşmacı verisi yüklenirken bir hata oluştu.</div>`;
      }
      if (detailContainer) {
        detailContainer.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Detay verisi yüklenirken bir hata oluştu.</div>`;
      }
    }
  };

  const runSpeakersPage = async () => {
    try {
      const waitForSharedUI = window.SAUTTAT?.waitForSharedUI;
      if (typeof waitForSharedUI !== 'function') {
        console.error('global_scripts.js must load before assets/js/pages/speakers.js');
        return;
      }
      await waitForSharedUI();
      await initSpeakersPages();
    } catch (error) {
      console.error(error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        void runSpeakersPage();
      },
      { once: true }
    );
  } else {
    void runSpeakersPage();
  }
})();
