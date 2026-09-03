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
})();
