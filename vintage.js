document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.vintage-body');
  const viewport = document.getElementById('filmstripViewport');
  const track = document.getElementById('filmstripTrack');
  const frames = Array.from(track.querySelectorAll('.frame'));
  const frameCurrent = document.getElementById('frameCurrent');
  const frameTotal = document.getElementById('frameTotal');
  const ruler = document.getElementById('rulerIndicator');
  const zoomToggle = document.getElementById('zoomToggle');
  const soundToggle = document.getElementById('soundToggle');
  const gesturesToggle = document.getElementById('gesturesToggle');
  const lightbox = document.getElementById('frameLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const shutterSound = new Audio('./assets/shutter.mp3');

  frameTotal.textContent = String(frames.length).padStart(2, '0');

  // ── Convert vertical wheel scroll into horizontal movement ──
  viewport.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // ── Update frame counter + ruler indicator as you scroll ──
  function updateProgress() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const progress = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
    ruler.style.left = `${progress * 100}%`;

    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    frames.forEach((frame, i) => {
      const frameCenter = frame.offsetLeft + frame.offsetWidth / 2;
      const dist = Math.abs(frameCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    frameCurrent.textContent = String(closestIndex + 1).padStart(2, '0');
  }
  viewport.addEventListener('scroll', updateProgress);
  updateProgress();

  // ── Click-and-drag panning, only active when GESTURES is ON ──
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  viewport.addEventListener('mousedown', (e) => {
    if (!body.classList.contains('gestures-on')) return;
    isDown = true;
    viewport.classList.add('is-dragging');
    startX = e.pageX;
    startScroll = viewport.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    viewport.classList.remove('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    viewport.scrollLeft = startScroll - (e.pageX - startX);
  });

  // ── ZOOM toggle: shows hover label + enables click-to-enlarge ──
  zoomToggle.addEventListener('click', () => {
    const on = body.classList.toggle('zoom-on');
    zoomToggle.querySelector('span').textContent = on ? '[ON]' : '[OFF]';
  });

  // ── SOUND toggle (visual state only) ──
  soundToggle.addEventListener('click', () => {
    const span = soundToggle.querySelector('span');
    const isOn = span.textContent === '[ON]';
    span.textContent = isOn ? '[OFF]' : '[ON]';
  });

  // ── GESTURES toggle: enables/disables click-and-drag panning ──
  gesturesToggle.addEventListener('click', () => {
    const on = body.classList.toggle('gestures-on');
    gesturesToggle.querySelector('span').textContent = on ? '[ON]' : '[OFF]';
    viewport.style.cursor = on ? 'grab' : 'default';
  });

  // ── Click a frame to open the lightbox (only when ZOOM is on) ──
  frames.forEach((frame) => {
    frame.addEventListener('click', () => {
      if (!body.classList.contains('zoom-on')) return;
      const img = frame.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('is-open');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('is-open');
    }
  });
});