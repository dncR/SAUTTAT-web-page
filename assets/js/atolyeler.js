(function () {
  const DATA_PATH = 'assets/data/atolyeler.json';
  const LIST_CONTAINER_ID = 'atolyelerList';
  const PAGINATION_CONTAINER_ID = 'atolyelerPagination';
  const DETAIL_CONTAINER_ID = 'atolyeDetail';
  const EMPTY_ALERT_CLASS = 'alert alert-warning';
  const PAGE_SIZE = 6;
  const DEFAULT_CATEGORY = 'Sosyal';

  const escapeHtml = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const slugify = (value) =>
    String(value ?? '')
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = String(dateString).split('-');
    if (parts.length !== 3) return dateString;
    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return dateString;
    const date = new Date(year, month, day);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const normalizePerson = (person) => {
    if (!person) return '';
    if (Array.isArray(person)) return person.map((name) => String(name).trim()).filter(Boolean).join(', ');
    return String(person).trim();
  };

  const resolveSlug = (item) => {
    if (item.slug) return String(item.slug).trim();
    if (item.slug_id && String(item.slug_id).includes('_')) {
      const suffix = String(item.slug_id).split('_').slice(1).join('_').trim();
      if (suffix) return suffix;
    }
    return slugify(item.title || item.slug_id || 'atolye');
  };

  const normalizeItem = (item) => {
    const title = String(item.title ?? '').trim();
    const date = String(item.date ?? '').trim();
    const slug = resolveSlug(item);

    return {
      slug,
      slugId: item.slug_id ? String(item.slug_id).trim() : '',
      title,
      date,
      dateLabel: formatDate(date),
      coordinator: normalizePerson(item.coordinator),
      educator: normalizePerson(item.educator),
      description: String(item.description ?? '').trim(),
      category: String(item.category ?? '').trim(),
      image: String(item.image ?? '').trim(),
      price: item.price !== undefined && item.price !== null ? String(item.price).trim() : '',
      location: String(item.location ?? '').trim(),
      capacity: item.capacity !== undefined && item.capacity !== null ? String(item.capacity).trim() : '',
    };
  };

  const normalizeData = (raw) => {
    if (Array.isArray(raw)) return raw.map(normalizeItem);
    if (raw && Array.isArray(raw.items)) return raw.items.map(normalizeItem);
    if (raw && typeof raw === 'object') return [normalizeItem(raw)];
    return [];
  };

  const sortByDateAsc = (items) =>
    [...items].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    });

  const normalizeCategory = (category) => String(category ?? '').trim().toLocaleLowerCase('tr-TR');

  const normalizeSearchText = (value) => String(value ?? '').toLocaleLowerCase('tr-TR').trim();

  const filterByCategory = (items, category) => {
    const key = normalizeCategory(category);
    return items.filter((item) => normalizeCategory(item.category) === key);
  };

  const filterBySearch = (items, query) => {
    const key = normalizeSearchText(query);
    if (!key) return items;
    return items.filter((item) => {
      const haystack = normalizeSearchText([
        item.title,
        item.coordinator,
        item.educator,
        item.description,
      ].join(' '));
      return haystack.includes(key);
    });
  };

  const buildMetaBadges = (item) => {
    const badges = [];
    if (item.category) {
      const categoryKey = normalizeCategory(item.category);
      let categoryClass = 'badge-category-default';
      if (categoryKey === 'sosyal') categoryClass = 'badge-category-social';
      if (categoryKey === 'bilimsel') categoryClass = 'badge-category-scientific';
      badges.push(`<span class="badge ${categoryClass}">${escapeHtml(item.category)}</span>`);
    }
    if (item.dateLabel) {
      badges.push(`<span class="ms-auto text-muted scriptsize">Son güncelleme: ${escapeHtml(item.dateLabel)}</span>`);
    }
    return badges.join(' ');
  };

  const renderList = (container, items) => {
    if (!items.length) {
      container.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Aradığınız kriterler ile uyuşan bir atölye bulunamadı...</div>`;
      return;
    }

    container.innerHTML = sortByDateAsc(items)
      .map((item) => {
        const image = item.image || 'assets/img/static/icerik_hazirlaniyor.png';
        return `
          <div class="col-12 col-md-6 col-xl-4">
            <article class="atolye-card h-100">
              <img class="atolye-card-image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}">
              <div class="atolye-card-body">
                <div class="d-flex align-items-center gap-2 mb-2">${buildMetaBadges(item)}</div>
                <h2 class="h5 fw-bold mb-2">${escapeHtml(item.title || 'Başlıksız Atölye')}</h2>
                <p class="text-muted small mb-2"><strong>Koordinatör:</strong> ${escapeHtml(item.coordinator || '-')}</p>
                <p class="text-muted small mb-3"><strong>Eğitmen:</strong> ${escapeHtml(item.educator || '-')}</p>
                <a class="btn btn-sm btn-outline-primary" href="pages/atolye-detay.html?slug=${encodeURIComponent(item.slug)}">Detaya Git</a>
              </div>
            </article>
          </div>
        `;
      })
      .join('');
  };

  const renderPagination = (container, totalPages, currentPage) => {
    if (!container) return;
    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const active = page === currentPage ? 'active' : '';
      return `
        <li class="page-item ${active}">
          <button class="page-link" type="button" data-page="${page}">${page}</button>
        </li>
      `;
    }).join('');

    container.innerHTML = `
      <nav aria-label="Atölye sayfalama">
        <ul class="pagination justify-content-center flex-wrap gap-1">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" type="button" data-page="${currentPage - 1}" aria-label="Önceki">Önceki</button>
          </li>
          ${pageButtons}
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" type="button" data-page="${currentPage + 1}" aria-label="Sonraki">Sonraki</button>
          </li>
        </ul>
      </nav>
    `;
  };

  const updateCategoryButtons = (activeCategory) => {
    const buttons = document.querySelectorAll('[data-category-btn]');
    buttons.forEach((button) => {
      const isActive = button.getAttribute('data-category-btn') === activeCategory;
      button.classList.toggle('active', isActive);
    });
  };

  const initListPage = (listContainer, paginationContainer, items) => {
    const state = {
      activeCategory: DEFAULT_CATEGORY,
      currentPage: 1,
      items,
      searchQuery: '',
    };

    const render = () => {
      const filteredByCategory = filterByCategory(state.items, state.activeCategory);
      const filteredItems = sortByDateAsc(filterBySearch(filteredByCategory, state.searchQuery));
      const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
      if (state.currentPage > totalPages) state.currentPage = totalPages;
      const start = (state.currentPage - 1) * PAGE_SIZE;
      const pagedItems = filteredItems.slice(start, start + PAGE_SIZE);
      renderList(listContainer, pagedItems);
      renderPagination(paginationContainer, totalPages, state.currentPage);
      updateCategoryButtons(state.activeCategory);
    };

    document.querySelectorAll('[data-category-btn]').forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category-btn');
        if (!category || category === state.activeCategory) return;
        state.activeCategory = category;
        state.currentPage = 1;
        render();
      });
    });

    const searchInput = document.getElementById('atolyeSearchInput');
    if (searchInput instanceof HTMLInputElement) {
      searchInput.addEventListener('input', () => {
        state.searchQuery = searchInput.value;
        state.currentPage = 1;
        render();
      });
    }

    if (paginationContainer) {
      paginationContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const pageItem = target.closest('.page-item');
        if (pageItem && (pageItem.classList.contains('disabled') || pageItem.classList.contains('active'))) return;
        const pageValue = target.getAttribute('data-page');
        if (!pageValue) return;
        const nextPage = Number(pageValue);
        if (!Number.isInteger(nextPage) || nextPage < 1) return;
        state.currentPage = nextPage;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    render();
  };

  const renderDetail = (container, item) => {
    if (!item) {
      container.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Aradığınız atölye bulunamadı.</div>`;
      return;
    }

    const image = item.image || 'assets/img/static/icerik_hazirlaniyor.png';
    const extraFields = [
      item.price ? `<li><strong>Ücret:</strong> ${escapeHtml(item.price)}</li>` : '',
      item.location ? `<li><strong>Konum:</strong> ${escapeHtml(item.location)}</li>` : '',
      item.capacity ? `<li><strong>Kapasite:</strong> ${escapeHtml(item.capacity)}</li>` : ''
    ]
      .filter(Boolean)
      .join('');

    container.innerHTML = `
      <article class="atolye-detail-card">
        <div class="row align-items-start">
          <div class="col-lg-5 atolye-detail-media">
            <img class="atolye-detail-image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}">
          </div>
          <div class="col-lg-7 atolye-detail-content">
            <div class="d-flex align-items-center gap-2 mb-2">${buildMetaBadges(item)}</div>
            <h1 class="h2 fw-bold mb-3">${escapeHtml(item.title || 'Atölye')}</h1>
            <ul class="list-unstyled text-muted mb-3">
              <li><strong>Koordinatör:</strong> ${escapeHtml(item.coordinator || '-')}</li>
              <li><strong>Eğitmen:</strong> ${escapeHtml(item.educator || '-')}</li>
              ${extraFields}
            </ul>
            <p class="mb-4">${escapeHtml(item.description || 'Açıklama eklenmedi.')}</p>
            <a class="btn btn-outline-primary" href="pages/atolyeler.html">Tüm Atölyelere Dön</a>
          </div>
        </div>
      </article>
    `;
  };

  const setAtolyelerNavActive = () => {
    let retries = 0;
    const maxRetries = 20;
    const tick = () => {
      const links = document.querySelectorAll('[data-nav-match="atolyeler"]');
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

  const fetchAtolyeler = async () => {
    const response = await fetch(DATA_PATH);
    if (!response.ok) throw new Error('Atölye verisi yüklenemedi.');
    const raw = await response.json();
    return normalizeData(raw).filter((item) => item.slug && item.title);
  };

  const initAtolyelerPages = async () => {
    const listContainer = document.getElementById(LIST_CONTAINER_ID);
    const paginationContainer = document.getElementById(PAGINATION_CONTAINER_ID);
    const detailContainer = document.getElementById(DETAIL_CONTAINER_ID);
    if (!listContainer && !detailContainer) return;

    try {
      const items = await fetchAtolyeler();
      if (listContainer) {
        initListPage(listContainer, paginationContainer, items);
      }
      if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug') || '';
        const found = items.find((item) => item.slug === slug || item.slugId === slug);
        renderDetail(detailContainer, found);
        setAtolyelerNavActive();
      }
    } catch (error) {
      console.error(error);
      if (listContainer) {
        listContainer.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Atölye verisi yüklenirken bir hata oluştu.</div>`;
      }
      if (detailContainer) {
        detailContainer.innerHTML = `<div class="${EMPTY_ALERT_CLASS}" role="alert">Detay verisi yüklenirken bir hata oluştu.</div>`;
      }
    }
  };

  document.addEventListener('DOMContentLoaded', initAtolyelerPages);
})();
