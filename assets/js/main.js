/* ==========================================================================
   Damiano Tropea — Personal Trainer Catania / Coaching Online
   Script principale: header sticky, menu mobile, animazioni, form contatti
   ========================================================================== */
(function () {
  'use strict';

  var PLACEHOLDER_PREFIX = '[INSERIRE';

  /* ---------------------------------------------------------------
     Header: stato "scrolled"
     --------------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }

  /* ---------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var CLOSE_DELAY = 300;

  function openMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.hidden = false;
    window.requestAnimationFrame(function () {
      mobileMenu.classList.add('is-open');
    });
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Chiudi il menu di navigazione');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Apri il menu di navigazione');
    document.body.classList.remove('nav-open');
    window.setTimeout(function () {
      if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
    }, CLOSE_DELAY);
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1060 && mobileMenu.classList.contains('is-open')) closeMenu();
    });

    // Il menu chiuso non deve restare nel flusso di tabulazione
    window.setTimeout(function () {
      if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
    }, 0);
  }

  /* ---------------------------------------------------------------
     Animazioni all'ingresso nel viewport
     --------------------------------------------------------------- */
  var revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement
          ? Array.prototype.indexOf.call(el.parentElement.children, el)
          : 0;
        el.style.transitionDelay = Math.min(siblings, 3) * 90 + 'ms';
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(revealItems, function (el) {
      observer.observe(el);
    });
  }

  /* ---------------------------------------------------------------
     Configurazione (assets/js/config.js): link, testimonianze, video
     --------------------------------------------------------------- */
  var CONFIG = window.SITE_CONFIG || {};

  function isHttps(value) {
    return typeof value === 'string' && /^https:\/\//i.test(value);
  }

  function applyHref(selector, value) {
    if (!isHttps(value)) return;
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      el.setAttribute('href', value);
    });
  }

  applyHref('.js-whatsapp', CONFIG.whatsapp);
  applyHref('.js-instagram', CONFIG.instagram);
  applyHref('.js-tiktok', CONFIG.tiktok);


  if (CONFIG.instagramHandle) {
    Array.prototype.forEach.call(document.querySelectorAll('.js-instagram-handle'), function (el) {
      el.textContent = CONFIG.instagramHandle;
    });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function svgIcon(id) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    var use = document.createElementNS(ns, 'use');
    svg.setAttribute('aria-hidden', 'true');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  function photo(src, alt, label) {
    var wrap = el('div', 'ba-half');
    var img = el('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    wrap.appendChild(img);
    if (label) wrap.appendChild(el('span', 'ba-tag', label));
    return wrap;
  }

  function renderTestimonials() {
    var grid = document.getElementById('testimonial-grid');
    if (!grid) return;
    var max = parseInt(grid.getAttribute('data-max'), 10) || 6;
    var items = (CONFIG.testimonials || []).slice(0, max);
    var slots = 0;

    items.forEach(function (item) {
      if (!item) return;
      var card;
      if (item.before && item.after) {
        card = el('figure', 'testimonial-card testimonial-card--ba');
        card.appendChild(photo(item.before, (item.alt || 'Foto di un cliente') + ' - prima', 'Prima'));
        card.appendChild(photo(item.after, (item.alt || 'Foto di un cliente') + ' - dopo', 'Dopo'));
        slots += 2;
      } else if (item.src) {
        card = el('figure', 'testimonial-card');
        var img = el('img');
        img.src = item.src;
        img.alt = item.alt || 'Foto testimonianza di un cliente';
        img.loading = 'lazy';
        img.decoding = 'async';
        card.appendChild(img);
        slots += 1;
      } else {
        return;
      }
      if (item.caption) card.appendChild(el('figcaption', '', item.caption));
      grid.appendChild(card);
    });

    var target = Math.max(slots, 4);
    for (var i = slots; i < target; i++) {
      var empty = el('figure', 'testimonial-card is-empty');
      var box = el('div', 'testimonial-empty');
      box.appendChild(el('span', 'placeholder-text', '[Inserire foto testimonianza autorizzata]'));
      box.appendChild(el('span', 'slot-hint', 'Spazio riservato — solo foto reali e autorizzate'));
      empty.appendChild(box);
      grid.appendChild(empty);
      slots++;
    }
    grid.setAttribute('data-count', String(slots));
  }

  function renderTikTok() {
    var grid = document.getElementById('tiktok-grid');
    if (!grid) return;
    var max = parseInt(grid.getAttribute('data-max'), 10) || 8;
    var items = (CONFIG.tiktokVideos || []).filter(function (v) { return v && isHttps(v.url); }).slice(0, max);
    var count = Math.max(items.length, 4);
    grid.setAttribute('data-count', String(count));
    var profile = isHttps(CONFIG.tiktok) ? CONFIG.tiktok : 'https://www.tiktok.com/@damianotropea_pt';

    for (var i = 0; i < count; i++) {
      var item = items[i];
      var tile = el('a', 'social-item' + (item ? '' : ' is-empty'));
      tile.href = item ? item.url : profile;
      tile.target = '_blank';
      tile.rel = 'noopener noreferrer';

      if (item && item.thumb) {
        var img = el('img');
        img.src = item.thumb;
        img.alt = item.title || 'Anteprima di un video TikTok';
        img.loading = 'lazy';
        img.decoding = 'async';
        tile.appendChild(img);
      }

      var play = el('span', 'social-play');
      play.setAttribute('aria-hidden', 'true');
      play.appendChild(svgIcon('i-play'));
      tile.appendChild(play);
      tile.appendChild(el('span', 'social-meta', item ? (item.title || 'Video TikTok · @damianotropea_pt') : '[Inserire video TikTok]'));

      grid.appendChild(tile);
    }
  }

  renderTestimonials();
  renderTikTok();

  /* ---------------------------------------------------------------
     Form contatti
     --------------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  var statusBox = document.getElementById('form-status');

  function showStatus(type, message) {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.className = 'form-status is-visible form-status--' + type;
  }

  /**
   * Restituisce il link WhatsApp solo se è stato configurato davvero
   * (cioè se non è più il segnaposto [INSERIRE_LINK_WHATSAPP]).
   */
  function whatsAppHref() {
    var el = document.querySelector('.js-whatsapp');
    var href = el ? el.getAttribute('href') || '' : '';
    return /^https?:\/\//i.test(href) ? href : '';
  }

  function buildMessage(data) {
    return [
      'Nuova richiesta dal sito',
      'Nome: ' + (data.get('nome') || ''),
      'Email: ' + (data.get('email') || ''),
      'Obiettivo: ' + (data.get('obiettivo') || ''),
      'Messaggio: ' + (data.get('messaggio') || '')
    ].join('\n');
  }

  function openWhatsApp(text) {
    var base = whatsAppHref();
    if (!base) return false;
    var url = base + (base.indexOf('?') === -1 ? '?' : '&') + 'text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
    return true;
  }

  function instagramHandle() {
    var match = /instagram\.com\/([^\/?#]+)/i.exec(CONFIG.instagram || '');
    return match ? match[1] : '';
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(area);
      if (ok) resolve(); else reject(new Error('copy'));
    });
  }

  var CHANNEL_HINTS = {
    whatsapp: 'Si apre la chat con la richiesta già scritta: ti basta premere invia.',
    instagram: 'La richiesta viene copiata e si apre la chat Instagram: incollala nel messaggio e invia.',
    tiktok: 'La richiesta viene copiata e si apre il profilo TikTok: incollala in un messaggio diretto.'
  };

  function selectedChannel() {
    var checked = form && form.querySelector('input[name="canale"]:checked');
    return checked ? checked.value : 'whatsapp';
  }

  /**
   * Invia la richiesta sul canale scelto. Restituisce true se ha aperto qualcosa.
   * Instagram e TikTok non permettono di precompilare il messaggio: il testo
   * viene copiato negli appunti e l'utente lo incolla nella chat.
   */
  function sendViaChannel(channel, text) {
    if (channel === 'whatsapp') {
      if (!openWhatsApp(text)) return null;
      showStatus('ok', 'Si è aperta la chat WhatsApp con la tua richiesta: premi invia per completarla.');
      return true;
    }

    var url = '';
    var label = '';
    if (channel === 'instagram') {
      var handle = instagramHandle();
      url = handle ? 'https://ig.me/m/' + handle : (isHttps(CONFIG.instagram) ? CONFIG.instagram : '');
      label = 'Instagram';
    } else {
      url = isHttps(CONFIG.tiktok) ? CONFIG.tiktok : '';
      label = 'TikTok';
    }
    if (!url) return null;

    var opened = window.open('about:blank', '_blank');
    function go() { if (opened) opened.location.href = url; else window.open(url, '_blank', 'noopener'); }

    copyText(text).then(function () {
      go();
      showStatus('ok', 'Richiesta copiata. Si apre ' + label + ': incolla il messaggio nella chat e invialo.');
    }).catch(function () {
      go();
      showStatus('warn', 'Si apre ' + label + ', ma non sono riuscito a copiare il testo. Scrivi tu il messaggio nella chat.');
    });
    return true;
  }

  if (form) {
    var endpointOn = isHttps(CONFIG.formEndpoint);
    var pick = document.getElementById('channel-pick');
    var hint = document.getElementById('pick-hint');

    function refreshHint() { if (hint) hint.textContent = CHANNEL_HINTS[selectedChannel()] || ''; }
    refreshHint();
    form.addEventListener('change', function (event) {
      if (event.target && event.target.name === 'canale') refreshHint();
    });
    if (pick && endpointOn) pick.hidden = true;

    Array.prototype.forEach.call(document.querySelectorAll('[data-obiettivo]'), function (link) {
      link.addEventListener('click', function () {
        var select = document.getElementById('obiettivo');
        if (select) select.value = link.getAttribute('data-obiettivo');
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        showStatus('warn', 'Controlla i campi obbligatori prima di inviare la richiesta.');
        return;
      }

      var data = new FormData(form);
      var summary = buildMessage(data);
      var action = endpointOn ? CONFIG.formEndpoint : (form.getAttribute('action') || '');
      var endpointConfigured = action && action.indexOf(PLACEHOLDER_PREFIX) === -1;

      if (endpointConfigured) {
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (response) {
            if (!response.ok) throw new Error('Risposta ' + response.status);
            form.reset();
            showStatus('ok', 'Richiesta inviata. Ti risponderò il prima possibile.');
          })
          .catch(function () {
            if (!sendViaChannel('whatsapp', summary)) {
              showStatus('warn', 'Non è stato possibile inviare la richiesta. Riprova tra qualche istante.');
            }
          })
          .then(function () {
            if (submitBtn) submitBtn.disabled = false;
          });
        return;
      }

      if (!sendViaChannel(selectedChannel(), summary)) {
        showStatus('warn', 'Questo canale non è ancora attivo. Scegline un altro oppure scrivimi direttamente.');
      }
    });
  }

  /* ---------------------------------------------------------------
     Anno nel footer
     --------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------
     Avviso in console: segnaposto ancora da sostituire
     --------------------------------------------------------------- */
  function auditPlaceholders() {
    var pending = [];

    Array.prototype.forEach.call(document.querySelectorAll('[href], [action]'), function (el) {
      ['href', 'action'].forEach(function (attr) {
        var value = el.getAttribute(attr);
        if (value && value.indexOf(PLACEHOLDER_PREFIX) !== -1) {
          pending.push('<.' + el.tagName.toLowerCase() + ' ' + attr + '="' + value + '">');
        }
      });
    });

    var textPending = document.body.innerHTML.indexOf(PLACEHOLDER_PREFIX) !== -1;

    if (pending.length) {
      console.warn(
        '[Damiano Tropea — sito] Segnaposto da sostituire prima di pubblicare:\n' + pending.join('\n') +
        (textPending ? '\n(Controlla anche i segnaposto nei testi, es. testimonianze e progressi.)' : '')
      );
    }
  }

  /* ---------------------------------------------------------------
     Init
     --------------------------------------------------------------- */
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if ('requestAnimationFrame' in window) {
    window.requestAnimationFrame(auditPlaceholders);
  }
})();
