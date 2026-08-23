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

  // ── Active page detection ─────────────────────────────────────
  var activePage = document.body.getAttribute('data-active-nav') ||
                   (window.location.pathname.split('/').pop() || 'index.html');
  var isHomePage = (activePage === 'index.html' || activePage === '');

  // ── Header initialisation (runs after partial loads) ─────────
  function initHeader() {
    var header = document.getElementById('site-header-bar');
    if (!header) return;

    // Mark the current page link as active
    document.querySelectorAll('#site-header-bar .header-link, #site-header-bar .mobile-link')
      .forEach(function (link) {
        if (link.getAttribute('href') === activePage) {
          link.classList.add('nav-active');
        }
      });

    // Mobile nav toggle
    var btn  = document.getElementById('menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        menu.classList.toggle('open');
        btn.classList.toggle('open');
      });
    }

    // Transparent header on homepage; solid on all other pages
    if (isHomePage) {
      header.classList.add('header-transparent');
      window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
          header.classList.remove('header-transparent');
          header.classList.add('header-solid');
        } else {
          header.classList.remove('header-solid');
          header.classList.add('header-transparent');
        }
      }, { passive: true });
    } else {
      header.classList.add('header-solid');
    }
  }

  loadPartial('partials/header.html', 'site-header', initHeader);
  loadPartial('partials/footer.html', 'site-footer', null);

  // ── Hero GSAP text animations (index.html only) ───────────────
  if (isHomePage && typeof gsap !== 'undefined') {

    // Arabic Bismillah slides in from the RIGHT (RTL feel)
    gsap.fromTo('#hero-bismillah',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.15, ease: 'power3.out' }
    );
    // Brand name slides from left
    gsap.fromTo('#hero-title',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9, delay: 0.35, ease: 'power3.out' }
    );
    // Tagline slides from left, slight extra delay
    gsap.fromTo('#hero-tagline',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, delay: 0.52, ease: 'power3.out' }
    );
    // Body text slides from left
    gsap.fromTo('#hero-body',
      { opacity: 0, x: -35 },
      { opacity: 1, x: 0, duration: 0.85, delay: 0.68, ease: 'power3.out' }
    );
    // CTAs rise from below
    gsap.fromTo('#hero-ctas',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.85, ease: 'power3.out' }
    );

    // Mission section image cluster: drifts left as section scrolls through viewport
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.mission-img-cluster', {
        x: -55,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mission-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }
  }

  // ── Contact form loading state ────────────────────────────────
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

  // ── Animated stat counters ────────────────────────────────────
  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el       = entry.target;
        var target   = parseInt(el.dataset.counter, 10);
        var duration = 1400;
        var increment = Math.max(1, Math.ceil(target / (duration / 16)));
        var current  = 0;
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

  // ── AOS (Animate On Scroll) ───────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });
  }

})();
