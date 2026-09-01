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

// Rebuild the specialties strip as two identical, evenly divided groups.
// This guarantees a seamless loop with no empty gap at the end of a cycle.
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const specialties = ['MECHAS', 'COLORAÇÃO', 'MICROPIGMENTAÇÃO', 'SOBRANCELHAS'];
  const buildGroup = (hidden = false) => {
    const group = document.createElement('div');
    group.className = 'marquee-group';
    if (hidden) group.setAttribute('aria-hidden', 'true');

    specialties.forEach((label) => {
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
      width: max(100vw, 760px);
      flex: 0 0 max(100vw, 760px);
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: center;
    }
    .marquee-item {
      min-width: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(24px, 3vw, 52px);
      padding: 0 clamp(10px, 1.5vw, 24px);
      text-align: center;
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
    @media (prefers-reduced-motion: reduce) {
      .marquee-track { animation: none; }
    }
  `;
  document.head.appendChild(marqueeStyle);
}
