document.getElementById('year').textContent = new Date().getFullYear();
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// Fully responsive, gapless specialties marquee.
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const specialties = ['MECHAS', 'COLORAÇÃO', 'MICROPIGMENTAÇÃO', 'SOBRANCELHAS'];
  let resizeTimer;

  const createItem = (label) => {
    const item = document.createElement('span');
    item.className = 'marquee-item';
    item.append(document.createTextNode(label));

    const separator = document.createElement('i');
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '✦';
    item.appendChild(separator);
    return item;
  };

  const buildMarquee = () => {
    marqueeTrack.style.animation = 'none';
    marqueeTrack.replaceChildren();

    const measure = document.createElement('div');
    measure.className = 'marquee-group';
    specialties.forEach((label) => measure.appendChild(createItem(label)));
    marqueeTrack.appendChild(measure);

    const cycleWidth = measure.getBoundingClientRect().width;
    const viewportWidth = document.documentElement.clientWidth;
    const repeats = Math.max(2, Math.ceil((viewportWidth * 1.5) / cycleWidth));

    const groupA = document.createElement('div');
    groupA.className = 'marquee-group';
    const groupB = document.createElement('div');
    groupB.className = 'marquee-group';
    groupB.setAttribute('aria-hidden', 'true');

    for (let r = 0; r < repeats; r += 1) {
      specialties.forEach((label) => {
        groupA.appendChild(createItem(label));
        groupB.appendChild(createItem(label));
      });
    }

    marqueeTrack.replaceChildren(groupA, groupB);

    requestAnimationFrame(() => {
      const groupWidth = groupA.getBoundingClientRect().width;
      marqueeTrack.style.setProperty('--marquee-distance', `${groupWidth}px`);
      marqueeTrack.style.animation = reduced ? 'none' : 'marquee-seamless 52s linear infinite';
    });
  };

  const marqueeStyle = document.createElement('style');
  marqueeStyle.textContent = `
    .marquee-track {
      display: flex;
      width: max-content;
      will-change: transform;
    }
    .marquee-group {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      width: max-content;
    }
    .marquee-item {
      min-width: 0 !important;
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      padding-left: clamp(20px, 2.2vw, 36px);
      gap: clamp(20px, 2.2vw, 36px);
    }
    .marquee-item i {
      margin: 0;
      color: var(--rose);
      font-style: normal;
      flex: 0 0 auto;
    }
    @keyframes marquee-seamless {
      from { transform: translate3d(0,0,0); }
      to { transform: translate3d(calc(-1 * var(--marquee-distance)),0,0); }
    }
    @media (max-width:560px) {
      .marquee-item {
        padding-left: 16px;
        gap: 16px;
      }
    }
  `;
  document.head.appendChild(marqueeStyle);

  buildMarquee();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildMarquee, 120);
  });
}
