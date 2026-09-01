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

// Continuous specialties strip with equal visual spacing and no large gaps.
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const specialties = ['MECHAS', 'COLORAÇÃO', 'MICROPIGMENTAÇÃO', 'SOBRANCELHAS'];
  const repeatedSpecialties = [...specialties, ...specialties];

  const buildGroup = (hidden = false) => {
    const group = document.createElement('div');
    group.className = 'marquee-group';
    if (hidden) group.setAttribute('aria-hidden', 'true');

    repeatedSpecialties.forEach((label) => {
      const item = document.createElement('span');
      item.className = 'marquee-item';
      item.textContent = label;

      const separator = document.createElement('i');
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = '✦';

      item.appendChild(separator);
      group.appendChild(item);
    });

    return group;
  };

  marqueeTrack.replaceChildren(buildGroup(false), buildGroup(true));

  const marqueeStyle = document.createElement('style');
  marqueeStyle.textContent = `
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee-seamless 24s linear infinite;
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
      padding-left: clamp(22px, 2.4vw, 38px);
      gap: clamp(22px, 2.4vw, 38px);
    }
    .marquee-item i {
      margin: 0;
      color: var(--rose);
      font-style: normal;
      flex: 0 0 auto;
    }
    @keyframes marquee-seamless {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @media (max-width:560px) {
      .marquee-item {
        padding-left: 18px;
        gap: 18px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .marquee-track { animation: none; }
    }
  `;
  document.head.appendChild(marqueeStyle);
}
