(function () {
  // ── Partial loader ────────────────────────────────────────────
  function loadPartial(url, id, onLoaded) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var t = document.createElement('template');
        t.innerHTML = html.trim();
        el.replaceWith(t.content);
        if (onLoaded) onLoaded();
      })
      .catch(function () { if (onLoaded) onLoaded(); });
  }

  function initHeader() {
    // ── Active nav highlight ─────────────────────────────────
    var activeNav = document.body.getAttribute('data-active-nav') ||
                    (window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('header nav a, #mobile-menu a').forEach(function (link) {
      if (link.getAttribute('href') === activeNav) {
        link.classList.remove('text-ihsaanah-black');
        link.classList.add('text-ihsaanah-gold');
      }
    });

    // ── Mobile nav toggle ────────────────────────────────────
    var btn = document.getElementById('menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        menu.classList.toggle('open');
        btn.classList.toggle('open');
      });
    }
  }

  loadPartial('partials/header.html', 'site-header', initHeader);
  loadPartial('partials/footer.html', 'site-footer', null);

  // ── Page-specific features (DOM already available since script is at bottom of body) ──

  // Contact form — loading state on submit
  var form = document.querySelector('form[action*="web3forms"]');
  if (form) {
    form.addEventListener('submit', function () {
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
      }
    });
  }

  // Donate page — animated stat counters
  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.dataset.counter, 10);
        var duration = 1400;
        var increment = Math.max(1, Math.ceil(target / (duration / 16)));
        var current = 0;
        var timer = setInterval(function () {
          current = Math.min(current + increment, target);
          el.textContent = current.toLocaleString();
          if (current >= target) clearInterval(timer);
        }, 16);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  // ── AOS (Animate On Scroll) ───────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });
  }
})();
