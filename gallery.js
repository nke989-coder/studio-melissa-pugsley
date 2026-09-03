(() => {
  const showcase = document.querySelector('.editorial-showcase');
  const intro = showcase?.querySelector('.showcase-intro');
  if (!showcase || !intro) return;

  const images = Array.from({ length: 16 }, (_, index) => `./gallery/${index + 1}.jpeg`);

  const style = document.createElement('style');
  style.textContent = `
    .results-gallery {
      position: relative;
      overflow: hidden;
      margin: -54px 0 72px;
      padding: 18px 0 10px;
    }
    .results-gallery-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 0 clamp(24px,4vw,64px) 18px;
      color: #cbbdb5;
      font-size: 10px;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    .results-gallery-head span:last-child { opacity: .62; }
    .results-gallery-viewport {
      width: 100%;
      overflow: hidden;
      cursor: grab;
    }
    .results-gallery-viewport:active { cursor: grabbing; }
    .results-gallery-track {
      display: flex;
      width: max-content;
      will-change: transform;
      animation: results-gallery-loop 78s linear infinite;
    }
    .results-gallery:hover .results-gallery-track,
    .results-gallery:focus-within .results-gallery-track { animation-play-state: paused; }
    .results-gallery-group {
      display: flex;
      gap: 14px;
      padding-right: 14px;
      flex: 0 0 auto;
    }
    .result-card {
      width: clamp(220px,19vw,315px);
      aspect-ratio: 4/5;
      padding: 0;
      border: 0;
      background: #302724;
      position: relative;
      overflow: hidden;
      cursor: zoom-in;
      flex: 0 0 auto;
    }
    .result-card img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
      filter: saturate(.9) contrast(1.02);
      transition: transform .55s cubic-bezier(.2,.7,.2,1), filter .3s ease;
    }
    .result-card:after {
      content: 'AMPLIAR';
      position: absolute;
      left: 12px;
      bottom: 12px;
      padding: 7px 9px;
      background: rgba(40,32,29,.82);
      color: #fff;
      font: 500 8px/1 var(--sans);
      letter-spacing: .14em;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity .25s ease, transform .25s ease;
    }
    .result-card:hover img,
    .result-card:focus-visible img { transform: scale(1.035); filter: saturate(1) contrast(1.03); }
    .result-card:hover:after,
    .result-card:focus-visible:after { opacity: 1; transform: none; }
    @keyframes results-gallery-loop {
      from { transform: translate3d(0,0,0); }
      to { transform: translate3d(-50%,0,0); }
    }

    .gallery-lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      background: rgba(24,18,16,.94);
      backdrop-filter: blur(12px);
      opacity: 0;
      visibility: hidden;
      transition: opacity .22s ease, visibility .22s ease;
    }
    .gallery-lightbox.is-open { opacity: 1; visibility: visible; }
    .gallery-lightbox-stage {
      width: min(94vw,1320px);
      height: min(88vh,920px);
      display: grid;
      place-items: center;
      position: relative;
      padding: 54px 70px 48px;
    }
    .gallery-lightbox-image {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
      box-shadow: 0 30px 90px rgba(0,0,0,.3);
      user-select: none;
      -webkit-user-drag: none;
    }
    .gallery-lightbox-close,
    .gallery-lightbox-nav {
      border: 1px solid rgba(255,255,255,.35);
      background: rgba(40,32,29,.72);
      color: #fff;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: background .2s ease, border-color .2s ease, transform .2s ease;
    }
    .gallery-lightbox-close:hover,
    .gallery-lightbox-nav:hover { background: var(--clay); border-color: var(--clay); }
    .gallery-lightbox-close {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 44px;
      height: 44px;
      font: 300 25px/1 var(--sans);
      z-index: 2;
    }
    .gallery-lightbox-nav {
      position: absolute;
      top: 50%;
      width: 48px;
      height: 54px;
      transform: translateY(-50%);
      font: 300 27px/1 var(--serif);
      z-index: 2;
    }
    .gallery-lightbox-prev { left: 10px; }
    .gallery-lightbox-next { right: 10px; }
    .gallery-lightbox-counter {
      position: absolute;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,.72);
      font-size: 9px;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    body.gallery-open { overflow: hidden; }

    @media (max-width:900px) {
      .results-gallery { margin-top: -28px; margin-bottom: 52px; }
      .result-card { width: clamp(210px,34vw,290px); }
    }
    @media (max-width:560px) {
      .results-gallery { margin: -22px 0 42px; padding-top: 8px; }
      .results-gallery-head { padding: 0 20px 14px; font-size: 8px; }
      .results-gallery-head span:last-child { display: none; }
      .results-gallery-group { gap: 10px; padding-right: 10px; }
      .result-card { width: 72vw; max-width: 290px; }
      .result-card:after { opacity: 1; transform: none; }
      .gallery-lightbox-stage { width: 100vw; height: 100svh; padding: 70px 12px 62px; }
      .gallery-lightbox-close { top: 14px; right: 14px; width: 42px; height: 42px; }
      .gallery-lightbox-nav { width: 42px; height: 50px; background: rgba(40,32,29,.58); }
      .gallery-lightbox-prev { left: 8px; }
      .gallery-lightbox-next { right: 8px; }
      .gallery-lightbox-image { max-width: calc(100vw - 24px); max-height: calc(100svh - 132px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .results-gallery-viewport { overflow-x: auto; scrollbar-width: none; }
      .results-gallery-viewport::-webkit-scrollbar { display: none; }
      .results-gallery-track { animation: none !important; }
      .results-gallery-group[aria-hidden='true'] { display: none; }
    }
  `;
  document.head.appendChild(style);

  const gallery = document.createElement('section');
  gallery.className = 'results-gallery';
  gallery.setAttribute('aria-label', 'Galeria de resultados de cabelos');
  gallery.innerHTML = `
    <div class="results-gallery-head">
      <span>Resultados reais · cabelos</span>
      <span>Toque ou clique para ampliar</span>
    </div>
    <div class="results-gallery-viewport">
      <div class="results-gallery-track"></div>
    </div>`;
  intro.insertAdjacentElement('afterend', gallery);

  const track = gallery.querySelector('.results-gallery-track');

  const buildGroup = (duplicate = false) => {
    const group = document.createElement('div');
    group.className = 'results-gallery-group';
    if (duplicate) group.setAttribute('aria-hidden', 'true');

    images.forEach((src, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'result-card';
      button.dataset.galleryIndex = String(index);
      button.setAttribute('aria-label', `Ampliar resultado ${index + 1} de ${images.length}`);
      if (duplicate) button.tabIndex = -1;

      const img = document.createElement('img');
      img.src = src;
      img.alt = duplicate ? '' : `Resultado de cabelo ${index + 1}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      button.appendChild(img);
      group.appendChild(button);
    });
    return group;
  };

  track.append(buildGroup(false), buildGroup(true));

  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Resultado ampliado');
  lightbox.innerHTML = `
    <div class="gallery-lightbox-stage">
      <button class="gallery-lightbox-close" type="button" aria-label="Fechar galeria">×</button>
      <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Foto anterior">‹</button>
      <img class="gallery-lightbox-image" alt="" />
      <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Próxima foto">›</button>
      <div class="gallery-lightbox-counter" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.gallery-lightbox-image');
  const counter = lightbox.querySelector('.gallery-lightbox-counter');
  const closeButton = lightbox.querySelector('.gallery-lightbox-close');
  const prevButton = lightbox.querySelector('.gallery-lightbox-prev');
  const nextButton = lightbox.querySelector('.gallery-lightbox-next');

  let currentIndex = 0;
  let returnFocus = null;
  let touchStartX = 0;

  const render = () => {
    lightboxImage.src = images[currentIndex];
    lightboxImage.alt = `Resultado de cabelo ${currentIndex + 1} de ${images.length}`;
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

    const previous = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    [images[previous], images[next]].forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  };

  const openLightbox = (index, trigger) => {
    currentIndex = index;
    returnFocus = trigger;
    render();
    lightbox.classList.add('is-open');
    document.body.classList.add('gallery-open');
    closeButton.focus({ preventScroll: true });
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('gallery-open');
    if (returnFocus) returnFocus.focus({ preventScroll: true });
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    render();
  };

  track.addEventListener('click', (event) => {
    const button = event.target.closest('.result-card');
    if (!button) return;
    openLightbox(Number(button.dataset.galleryIndex), button);
  });

  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });

  lightbox.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);

    if (event.key === 'Tab') {
      const controls = [closeButton, prevButton, nextButton];
      const current = controls.indexOf(document.activeElement);
      if (event.shiftKey && current <= 0) {
        event.preventDefault();
        controls[controls.length - 1].focus();
      } else if (!event.shiftKey && current === controls.length - 1) {
        event.preventDefault();
        controls[0].focus();
      }
    }
  });
})();
