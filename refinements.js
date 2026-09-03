(() => {
  const linePin = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"></path>
      <circle cx="12" cy="10" r="2.25"></circle>
    </svg>`;

  document.querySelectorAll('.maps-button').forEach((button) => {
    button.innerHTML = `${linePin}<span>Maps</span>`;
  });

  const footerContact = document.querySelector('.footer-contact');
  if (footerContact) {
    const rows = footerContact.querySelectorAll('.footer-contact-row');
    rows.forEach((row, index) => {
      const value = row.querySelector(':scope > span');
      const action = row.querySelector('.contact-action');
      if (!value || !action) return;

      const meta = document.createElement('div');
      meta.className = 'contact-meta';
      const label = document.createElement('strong');
      label.textContent = index === 0 ? 'WhatsApp' : 'E-mail';
      const text = document.createElement('span');
      text.textContent = value.textContent;
      meta.append(label, text);
      value.replaceWith(meta);
    });
  }

  // The gallery pauses while it is being touched/dragged or while one of its
  // cards owns keyboard focus. Release that pointer-generated focus as soon as
  // the visitor leaves/releases the gallery so the automatic loop resumes
  // immediately without requiring an extra click elsewhere.
  const galleryViewport = document.querySelector('.results-gallery-viewport');
  if (galleryViewport) {
    const releasePointerFocus = () => {
      const active = document.activeElement;
      if (active && galleryViewport.contains(active) && active.matches('.result-card')) {
        active.blur();
      }
    };

    galleryViewport.addEventListener('pointerleave', releasePointerFocus);
    galleryViewport.addEventListener('pointerup', (event) => {
      if (event.pointerType !== 'mouse') releasePointerFocus();
    });
    galleryViewport.addEventListener('pointercancel', releasePointerFocus);
    galleryViewport.addEventListener('touchend', releasePointerFocus, { passive: true });
  }

  const siteUrl = 'https://nke989-coder.github.io/studio-melissa-pugsley/';
  const title = 'Cabelos e Micropigmentação em Curitiba e Florianópolis | Melissa Pugsley';
  const description = 'Studio Melissa Pugsley: cabelos, mechas, coloração, micropigmentação e sobrancelhas com atendimento em Curitiba e Florianópolis. Agende pelo WhatsApp.';
  const imageUrl = `${siteUrl}hero-cabelos.png`;

  document.title = title;

  const setMeta = (key, content, property = false) => {
    const attr = property ? 'property' : 'name';
    let meta = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, key);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('googlebot', 'index, follow, max-image-preview:large');
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', 'website', true);
  setMeta('og:url', siteUrl, true);
  setMeta('og:image', imageUrl, true);
  setMeta('og:locale', 'pt_BR', true);
  setMeta('og:site_name', 'Studio Melissa Pugsley', true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', imageUrl);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = siteUrl;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BeautySalon',
        '@id': `${siteUrl}#curitiba`,
        name: 'Studio Melissa Pugsley — Curitiba',
        url: siteUrl,
        image: imageUrl,
        telephone: '+55 41 99767-8286',
        email: 'mspugsley@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Antônio Cândido Cavalim, 562',
          addressLocality: 'Curitiba',
          addressRegion: 'PR',
          addressCountry: 'BR'
        },
        sameAs: ['https://www.instagram.com/melissapugsley_/'],
        knowsAbout: ['cabelos', 'mechas', 'coloração', 'micropigmentação', 'micropigmentação reparadora', 'sobrancelhas']
      },
      {
        '@type': 'BeautySalon',
        '@id': `${siteUrl}#florianopolis`,
        name: 'Studio Melissa Pugsley — Florianópolis',
        url: siteUrl,
        image: imageUrl,
        telephone: '+55 41 99767-8286',
        email: 'mspugsley@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Fermino Hermenegildo dos Santos, 364 — Fundos',
          addressLocality: 'Florianópolis',
          addressRegion: 'SC',
          addressCountry: 'BR'
        },
        sameAs: ['https://www.instagram.com/melissapugsley_/'],
        knowsAbout: ['cabelos', 'mechas', 'coloração', 'micropigmentação', 'micropigmentação reparadora', 'sobrancelhas']
      }
    ]
  };

  let jsonLd = document.getElementById('local-business-schema');
  if (!jsonLd) {
    jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.id = 'local-business-schema';
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(schema);
})();
