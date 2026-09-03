(() => {
  const storageKey = 'melissa_cookie_notice_v1';
  if (localStorage.getItem(storageKey)) return;

  const banner = document.createElement('aside');
  banner.className = 'cookie-notice';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de privacidade e cookies');
  banner.innerHTML = `
    <div class="cookie-notice-copy">
      <strong>Privacidade e cookies</strong>
      <p>Este site não utiliza cookies de publicidade ou análise neste momento. Usamos apenas recursos necessários ao funcionamento e uma preferência local para lembrar este aviso. Saiba mais nas nossas <a href="./politica-de-cookies.html">Políticas de Cookies</a> e <a href="./politica-de-privacidade.html">Política de Privacidade</a>.</p>
    </div>
    <button type="button" class="cookie-notice-accept">Entendi</button>`;

  const style = document.createElement('style');
  style.textContent = `
    .cookie-notice{position:fixed;left:50%;bottom:18px;z-index:1500;width:min(940px,calc(100% - 32px));transform:translateX(-50%);display:flex;align-items:center;justify-content:space-between;gap:28px;padding:18px 20px 18px 22px;background:rgba(42,33,29,.96);color:#f4eee7;border:1px solid rgba(240,201,186,.26);box-shadow:0 22px 70px rgba(0,0,0,.28);backdrop-filter:blur(16px);border-radius:18px;font-family:var(--sans,"DM Sans",sans-serif)}
    .cookie-notice-copy{min-width:0}.cookie-notice strong{display:block;margin-bottom:5px;color:#f0c9ba;font-size:11px;letter-spacing:.1em;text-transform:uppercase}.cookie-notice p{margin:0;max-width:720px;color:#e5d9d2;font-size:12px;line-height:1.65}.cookie-notice a{color:#fff;text-decoration:underline;text-decoration-color:rgba(240,201,186,.55);text-underline-offset:3px}.cookie-notice-accept{flex:0 0 auto;min-width:108px;padding:12px 17px;border:1px solid #b9684e;border-radius:999px;background:#b9684e;color:#fff;font:600 11px/1 var(--sans,"DM Sans",sans-serif);letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:transform .2s ease,background .2s ease}.cookie-notice-accept:hover,.cookie-notice-accept:focus-visible{background:#a95840;transform:translateY(-1px);outline:none}.cookie-notice.is-leaving{opacity:0;transform:translate(-50%,12px);transition:opacity .22s ease,transform .22s ease}
    @media(max-width:640px){.cookie-notice{bottom:10px;width:calc(100% - 20px);align-items:stretch;flex-direction:column;gap:14px;padding:17px;border-radius:16px}.cookie-notice p{font-size:11px}.cookie-notice-accept{width:100%}}
  `;
  document.head.appendChild(style);
  document.body.appendChild(banner);

  banner.querySelector('.cookie-notice-accept').addEventListener('click', () => {
    try { localStorage.setItem(storageKey, 'acknowledged'); } catch (_) { }
    banner.classList.add('is-leaving');
    window.setTimeout(() => banner.remove(), 230);
  });
})();