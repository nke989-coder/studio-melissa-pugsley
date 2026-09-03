document.getElementById('year').textContent = new Date().getFullYear();

// Replace diagonal arrow characters with a consistent SVG icon so iOS/Android
// never render them as blue emoji buttons. Wrapper elements are preserved so
// the existing desktop spacing and colors keep working.
const arrowSvg = `
  <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false" style="display:block;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round">
    <path d="M5 15 15 5"></path>
    <path d="M8 5h7v7"></path>
  </svg>`;

document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
  if (el.textContent.trim() === '↗') {
    el.innerHTML = arrowSvg;
  }
});

// Client-approved content updates.
const whatsappMessage = 'Olá, Melissa! Quero transformar meu visual, do meu jeito. Podemos conversar?';
const whatsappUrl = `https://wa.me/5541997678286?text=${encodeURIComponent(whatsappMessage)}`;

document.querySelectorAll('a[href*="wa.me/5541997678286"]').forEach((link) => {
  link.href = whatsappUrl;
});

document.querySelectorAll('.service-card-featured p').forEach((paragraph) => {
  paragraph.textContent = paragraph.textContent.replace('Melissa oferece um atendimento acolhedor', 'nós oferecemos um atendimento acolhedor');
});

// Full addresses with direct Google Maps actions.
const locationList = document.querySelector('.location-list');
if (locationList) {
  locationList.innerHTML = `
    <article class="location-row">
      <span>PR</span>
      <div>
        <h3>Curitiba</h3>
        <p>Antônio Cândido Cavalim, 562 · Bairro Alto</p>
        <small>Atendimento com hora marcada</small>
      </div>
      <a class="maps-button" href="https://www.google.com/maps/search/?api=1&query=Ant%C3%B4nio%20C%C3%A2ndido%20Cavalim%20562%20Bairro%20Alto%20Curitiba%20PR" target="_blank" rel="noopener" aria-label="Abrir endereço de Curitiba no Google Maps">
        <span class="maps-pin" aria-hidden="true"><i></i></span><b>Maps</b>
      </a>
    </article>
    <article class="location-row">
      <span>SC</span>
      <div>
        <h3>Florianópolis</h3>
        <p>Fermino Hermenegildo dos Santos, 364 · Fundos</p>
        <small>Atendimento com hora marcada</small>
      </div>
      <a class="maps-button" href="https://www.google.com/maps/search/?api=1&query=Fermino%20Hermenegildo%20dos%20Santos%20364%20Florian%C3%B3polis%20SC" target="_blank" rel="noopener" aria-label="Abrir endereço de Florianópolis no Google Maps">
        <span class="maps-pin" aria-hidden="true"><i></i></span><b>Maps</b>
      </a>
    </article>
    <p class="location-note">Consulte pelo WhatsApp as próximas datas disponíveis para atendimento.</p>`;
}

// Contact actions stay in the footer; the floating WhatsApp CTA retires when
// the visitor reaches the contact area so it never covers the footer.
const footerContact = [...document.querySelectorAll('footer > div')].find((block) => block.querySelector(':scope > p')?.textContent.trim().toLowerCase() === 'contato');
if (footerContact) {
  footerContact.classList.add('footer-contact');
  footerContact.innerHTML = `
    <p>Contato</p>
    <div class="footer-contact-row">
      <span>+55 41 99767-8286</span>
      <a class="contact-action whatsapp-action" href="${whatsappUrl}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3H13a8.48 8.48 0 0 1 8 8v.5Z"/><path d="M9 8.5c.5 2.4 2.1 4 4.5 4.8l1.2-1.1 2 .8c-.2 1.2-1 2.1-2.2 2.1-3.7-.2-7.2-3.6-7.5-7.2 0-1.2.8-2 2-2.2l.9 1.9L9 8.5Z"/></svg>
      </a>
    </div>
    <div class="footer-contact-row">
      <span>mspugsley@gmail.com</span>
      <a class="contact-action" href="mailto:mspugsley@gmail.com" aria-label="Enviar e-mail para Melissa">
        <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      </a>
    </div>`;
}

const floatingWhatsapp = document.querySelector('.floating-whatsapp');
const siteFooter = document.querySelector('footer');
if (floatingWhatsapp && siteFooter && 'IntersectionObserver' in window) {
  const footerObserver = new IntersectionObserver(([entry]) => {
    floatingWhatsapp.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.03 });
  footerObserver.observe(siteFooter);
}

const updateStyles = document.createElement('style');
updateStyles.textContent = `
  .location-row { grid-template-columns:55px minmax(0,1fr) auto !important; align-items:center; gap:16px; }
  .location-row small { display:block; margin-top:5px; font-size:10px; letter-spacing:.06em; opacity:.68; }
  .maps-button { width:58px; min-height:58px; border:1px solid rgba(255,255,255,.38); display:grid; place-items:center; align-content:center; gap:2px; transition:background .2s ease,transform .2s ease; }
  .maps-button:hover { background:rgba(255,255,255,.12); transform:translateY(-2px); }
  .maps-button b { font-size:8px; font-weight:500; letter-spacing:.08em; }
  .maps-pin { width:19px; height:23px; display:block; position:relative; border-radius:12px 12px 12px 2px; background:#fff; transform:rotate(-45deg); }
  .maps-pin:before { content:''; position:absolute; inset:4px; border-radius:50%; background:#4285f4; }
  .maps-pin i { position:absolute; width:6px; height:6px; border-radius:50%; background:#ea4335; left:6px; top:6px; z-index:2; }
  .footer-contact { min-width:250px; }
  footer div.footer-contact { gap:10px; }
  .footer-contact-row { width:100%; min-height:42px; display:grid !important; grid-template-columns:minmax(0,1fr) 38px; align-items:center !important; gap:12px !important; border-bottom:1px solid rgba(255,255,255,.12); font-size:13px; }
  .contact-action { width:34px; height:34px; display:grid; place-items:center; border:1px solid rgba(216,138,108,.55); color:#d88a6c; transition:background .2s ease,color .2s ease; }
  .contact-action:hover { background:#d88a6c; color:#fff; }
  .contact-action svg { width:18px; height:18px; fill:none; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
  .floating-whatsapp { transition:opacity .28s ease,transform .28s ease,visibility .28s; }
  .floating-whatsapp.is-hidden { opacity:0; transform:translateY(16px); visibility:hidden; pointer-events:none; }
  @media (max-width:560px) {
    .location-row { grid-template-columns:38px minmax(0,1fr) 52px !important; gap:10px; }
    .location-row p { line-height:1.45; }
    .maps-button { width:50px; min-height:50px; }
    .footer-contact { width:100%; }
  }
`;
document.head.appendChild(updateStyles);

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
  const specialties = ['MECHAS', 'COLORAÇÃO', 'MICROPIGMENTAÇÃO', 'SOBRANCELHAS', 'PENTEADOS', 'CASAMENTOS'];
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
