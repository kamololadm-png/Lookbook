/* ═══════════════════════════════════════════
   LOLLIPOP LOOKBOOK — script.js
   Spring / Summer 2026
═══════════════════════════════════════════ */

/* ─── Ticker: duplicate track content so the
       loop is seamless at any screen width ─── */
function initTickers() {
  document.querySelectorAll('.ticker-track').forEach((track) => {
    // Clone the existing spans and append them so the
    // CSS animation can loop without a visible jump
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  });
}

/* ─── Scroll-reveal: fade + lift items in as
       they enter the viewport ─── */
function initReveal() {
  const targets = document.querySelectorAll(
    '.look-item, .scatter-quote, .hero-img-main, .hero-thumb, .about-img-large, .about-img-small'
  );

  // Set initial hidden state via inline style so it
  // works even before the first IntersectionObserver tick
  targets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything immediately
    targets.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ─── Stagger reveal delays for the look items
       so they cascade in left-to-right ─── */
function initStaggerDelays() {
  document.querySelectorAll('.look-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
}

/* ─── Header: add a subtle shadow once the user
       scrolls past the ticker ─── */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 1px 18px rgba(26,24,20,0.07)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', () => {
  initTickers();
  initStaggerDelays();
  initReveal();
  initHeaderScroll();
});
