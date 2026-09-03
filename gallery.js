(() => {
  const showcase = document.querySelector('.editorial-showcase');
  const intro = showcase?.querySelector('.showcase-intro');
  if (!showcase || !intro) return;

  const images = Array.from({ length: 16 }, (_, index) => `./gallery/${index + 1}.jpeg`);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = document.createElement('style');
  style.textContent = `
    .results-gallery{position:relative;overflow:hidden;margin:-54px 0 72px;padding:18px 0 10px}
    .results-gallery-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 clamp(24px,4vw,64px) 18px;color:#cbbdb5;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
    .results-gallery-head span:last-child{opacity:.62}
    .results-gallery-viewport{width:100%;overflow:hidden;cursor:grab}
    .results-gallery-track{display:flex;width:max-content;will-change:transform;animation:results-gallery-loop 78s linear infinite}
    .results-gallery:hover .results-gallery-track,.results-gallery:focus-within .results-gallery-track{animation-play-state:paused}
    .results-gallery-group{display:flex;gap:14px;padding-right:14px;flex:0 0 auto}
    .result-card{width:clamp(220px,19vw,315px);aspect-ratio:4/5;padding:0;border:0;background:#302724;position:relative;overflow:hidden;cursor:zoom-in;flex:0 0 auto}
    .result-card img{width:100%;height:100%;display:block;object-fit:cover;object-position:center;filter:saturate(.9) contrast(1.02);transition:transform .55s cubic-bezier(.2,.7,.2,1),filter .3s ease}
    .result-card:after{content:'AMPLIAR';position:absolute;left:12px;bottom:12px;padding:7px 9px;background:rgba(40,32,29,.82);color:#fff;font:500 8px/1 var(--sans);letter-spacing:.14em;opacity:0;transform:translateY(4px);transition:opacity .25s ease,transform .25s ease}
    .result-card:hover img,.result-card:focus-visible img{transform:scale(1.035);filter:saturate(1) contrast(1.03)}
    .result-card:hover:after,.result-card:focus-visible:after{opacity:1;transform:none}
    @keyframes results-gallery-loop{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}

    .gallery-lightbox{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:rgba(24,18,16,.28);backdrop-filter:blur(0);opacity:0;visibility:hidden;transition:opacity .32s ease,visibility .32s ease,background .42s ease,backdrop-filter .42s ease}
    .gallery-lightbox.is-open{opacity:1;visibility:visible;background:rgba(24,18,16,.76);backdrop-filter:blur(18px) saturate(.8)}
    .gallery-lightbox-stage{position:relative;width:100vw;height:100dvh;display:grid;place-items:center;padding:68px 76px 58px;overflow:hidden}
    .gallery-lightbox-shell{position:relative;display:grid;place-items:center;width:max-content;height:max-content;max-width:calc(100vw - 152px);max-height:calc(100dvh - 126px);padding:10px;border-radius:28px;background:linear-gradient(145deg,rgba(255,255,255,.17),rgba(255,255,255,.045));border:1px solid rgba(255,255,255,.18);box-shadow:0 38px 110px rgba(0,0,0,.5),0 12px 34px rgba(185,104,78,.18),inset 0 1px 0 rgba(255,255,255,.22);opacity:0;transform:scale(.94);transition:opacity .18s ease}
    .gallery-lightbox-shell.is-ready{opacity:1}
    .gallery-lightbox-shell.is-floating{animation:gallery-float 5.4s ease-in-out infinite}
    @keyframes gallery-float{0%,100%{transform:translate3d(0,0,0) rotate(0)}50%{transform:translate3d(0,-8px,0) rotate(.22deg)}}
    .gallery-lightbox-image{display:block;width:auto;height:auto;max-width:min(86vw,1180px);max-height:calc(100dvh - 150px);object-fit:contain;border-radius:18px;box-shadow:0 18px 52px rgba(0,0,0,.28);user-select:none;-webkit-user-drag:none}
    .gallery-ghost{position:fixed;z-index:1002;object-fit:cover;margin:0;pointer-events:none;border-radius:3px;box-shadow:0 22px 75px rgba(0,0,0,.38);will-change:left,top,width,height,border-radius,transform,opacity;transition:left .52s cubic-bezier(.16,.84,.25,1),top .52s cubic-bezier(.16,.84,.25,1),width .52s cubic-bezier(.16,.84,.25,1),height .52s cubic-bezier(.16,.84,.25,1),border-radius .52s ease,transform .52s cubic-bezier(.16,.84,.25,1),opacity .2s ease}
    .gallery-lightbox-close,.gallery-lightbox-nav{border:1px solid rgba(255,255,255,.28);background:rgba(40,32,29,.5);color:#fff;display:grid;place-items:center;cursor:pointer;backdrop-filter:blur(10px);transition:background .2s ease,border-color .2s ease,transform .2s ease}
    .gallery-lightbox-close:hover,.gallery-lightbox-nav:hover{background:var(--clay);border-color:var(--clay)}
    .gallery-lightbox-close{position:absolute;top:18px;right:18px;width:46px;height:46px;border-radius:50%;font:300 25px/1 var(--sans);z-index:3}
    .gallery-lightbox-nav{position:absolute;top:50%;width:48px;height:56px;transform:translateY(-50%);border-radius:99px;font:300 27px/1 var(--serif);z-index:3}
    .gallery-lightbox-prev{left:14px}.gallery-lightbox-next{right:14px}
    .gallery-lightbox-counter{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.72);font-size:9px;letter-spacing:.16em;text-transform:uppercase}
    body.gallery-open{overflow:hidden}

    @media(max-width:900px){.results-gallery{margin-top:-28px;margin-bottom:52px}.result-card{width:clamp(210px,34vw,290px)}.gallery-lightbox-stage{padding:64px 58px 56px}.gallery-lightbox-shell{max-width:calc(100vw - 116px);max-height:calc(100dvh - 120px)}.gallery-lightbox-image{max-width:calc(100vw - 136px);max-height:calc(100dvh - 146px)}}
    @media(max-width:560px){.results-gallery{margin:-22px 0 42px;padding-top:8px}.results-gallery-head{padding:0 20px 14px;font-size:8px}.results-gallery-head span:last-child{display:none}.results-gallery-group{gap:10px;padding-right:10px}.result-card{width:72vw;max-width:290px}.result-card:after{opacity:1;transform:none}.gallery-lightbox-stage{padding:58px 10px 48px}.gallery-lightbox-shell{padding:7px;border-radius:22px;max-width:calc(100vw - 20px);max-height:calc(100dvh - 106px)}.gallery-lightbox-image{max-width:calc(100vw - 34px);max-height:calc(100dvh - 122px);border-radius:15px}.gallery-lightbox-close{top:10px;right:10px;width:42px;height:42px}.gallery-lightbox-nav{width:40px;height:50px;background:rgba(40,32,29,.43)}.gallery-lightbox-prev{left:5px}.gallery-lightbox-next{right:5px}.gallery-lightbox-counter{bottom:11px}}
    @media(prefers-reduced-motion:reduce){.results-gallery-viewport{overflow-x:auto;scrollbar-width:none}.results-gallery-track{animation:none!important}.results-gallery-group[aria-hidden='true']{display:none}.gallery-lightbox-shell.is-floating{animation:none}.gallery-ghost{transition:none}}
  `;
  document.head.appendChild(style);

  const gallery=document.createElement('section');
  gallery.className='results-gallery';
  gallery.setAttribute('aria-label','Galeria de resultados de cabelos');
  gallery.innerHTML=`<div class="results-gallery-head"><span>Resultados reais · cabelos</span><span>Toque ou clique para ampliar</span></div><div class="results-gallery-viewport"><div class="results-gallery-track"></div></div>`;
  intro.insertAdjacentElement('afterend',gallery);
  const track=gallery.querySelector('.results-gallery-track');

  const buildGroup=(duplicate=false)=>{
    const group=document.createElement('div');
    group.className='results-gallery-group';
    if(duplicate)group.setAttribute('aria-hidden','true');
    images.forEach((src,index)=>{
      const button=document.createElement('button');
      button.type='button';button.className='result-card';button.dataset.galleryIndex=String(index);
      button.setAttribute('aria-label',`Ampliar resultado ${index+1} de ${images.length}`);
      if(duplicate)button.tabIndex=-1;
      const img=document.createElement('img');img.src=src;img.alt=duplicate?'':`Resultado de cabelo ${index+1}`;img.loading='lazy';img.decoding='async';
      button.appendChild(img);group.appendChild(button);
    });
    return group;
  };
  track.append(buildGroup(false),buildGroup(true));

  const lightbox=document.createElement('div');
  lightbox.className='gallery-lightbox';lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Resultado ampliado');
  lightbox.innerHTML=`<div class="gallery-lightbox-stage"><button class="gallery-lightbox-close" type="button" aria-label="Fechar galeria">×</button><button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Foto anterior">‹</button><div class="gallery-lightbox-shell"><img class="gallery-lightbox-image" alt="" /></div><button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Próxima foto">›</button><div class="gallery-lightbox-counter" aria-live="polite"></div></div>`;
  document.body.appendChild(lightbox);

  const shell=lightbox.querySelector('.gallery-lightbox-shell');
  const lightboxImage=lightbox.querySelector('.gallery-lightbox-image');
  const counter=lightbox.querySelector('.gallery-lightbox-counter');
  const closeButton=lightbox.querySelector('.gallery-lightbox-close');
  const prevButton=lightbox.querySelector('.gallery-lightbox-prev');
  const nextButton=lightbox.querySelector('.gallery-lightbox-next');
  let currentIndex=0,returnFocus=null,touchStartX=0,animating=false;

  const preloadNeighbors=()=>{
    [(currentIndex-1+images.length)%images.length,(currentIndex+1)%images.length].forEach(i=>{const p=new Image();p.src=images[i]});
  };
  const render=(animate=false)=>{
    lightboxImage.src=images[currentIndex];
    lightboxImage.alt=`Resultado de cabelo ${currentIndex+1} de ${images.length}`;
    counter.textContent=`${String(currentIndex+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')}`;
    if(animate&&!reducedMotion)lightboxImage.animate([{opacity:.15,transform:'scale(.975)'},{opacity:1,transform:'scale(1)'}],{duration:260,easing:'ease-out'});
    preloadNeighbors();
  };
  const makeGhost=(rect,src)=>{
    const ghost=document.createElement('img');ghost.className='gallery-ghost';ghost.src=src;
    Object.assign(ghost.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    document.body.appendChild(ghost);return ghost;
  };
  const targetRect=()=>lightboxImage.getBoundingClientRect();

  const openLightbox=(index,trigger)=>{
    if(animating)return;animating=true;currentIndex=index;returnFocus=trigger;render();
    lightbox.classList.add('is-open');document.body.classList.add('gallery-open');shell.classList.remove('is-ready','is-floating');
    const start=trigger.querySelector('img')?.getBoundingClientRect()||trigger.getBoundingClientRect();
    const reveal=()=>{
      const end=targetRect();
      if(reducedMotion||!start.width||!end.width){shell.classList.add('is-ready','is-floating');animating=false;closeButton.focus({preventScroll:true});return;}
      const ghost=makeGhost(start,images[currentIndex]);
      requestAnimationFrame(()=>Object.assign(ghost.style,{left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,borderRadius:'18px',transform:'rotate(.2deg)'}));
      setTimeout(()=>{shell.classList.add('is-ready','is-floating');ghost.style.opacity='0';setTimeout(()=>ghost.remove(),210);animating=false;closeButton.focus({preventScroll:true})},530);
    };
    if(lightboxImage.complete)requestAnimationFrame(reveal);else lightboxImage.addEventListener('load',()=>requestAnimationFrame(reveal),{once:true});
  };

  const closeLightbox=()=>{
    if(animating||!lightbox.classList.contains('is-open'))return;animating=true;shell.classList.remove('is-floating');
    const start=targetRect();const targetImg=returnFocus?.querySelector('img');const end=targetImg?.getBoundingClientRect()||returnFocus?.getBoundingClientRect();
    const finish=()=>{lightbox.classList.remove('is-open');document.body.classList.remove('gallery-open');shell.classList.remove('is-ready');animating=false;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true})};
    if(reducedMotion||!end?.width){finish();return;}
    const ghost=makeGhost(start,images[currentIndex]);shell.classList.remove('is-ready');
    requestAnimationFrame(()=>Object.assign(ghost.style,{left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,borderRadius:'3px',transform:'rotate(-.2deg)'}));
    setTimeout(()=>{ghost.remove();finish()},540);
  };

  const move=direction=>{if(animating)return;currentIndex=(currentIndex+direction+images.length)%images.length;render(true)};
  track.addEventListener('click',event=>{const button=event.target.closest('.result-card');if(button)openLightbox(Number(button.dataset.galleryIndex),button)});
  closeButton.addEventListener('click',closeLightbox);prevButton.addEventListener('click',()=>move(-1));nextButton.addEventListener('click',()=>move(1));
  lightbox.addEventListener('click',event=>{if(event.target===lightbox||event.target.classList.contains('gallery-lightbox-stage'))closeLightbox()});
  lightbox.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0]?.clientX||0},{passive:true});
  lightbox.addEventListener('touchend',event=>{const d=(event.changedTouches[0]?.clientX||0)-touchStartX;if(Math.abs(d)>55)move(d>0?-1:1)},{passive:true});
  document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('is-open'))return;if(event.key==='Escape')closeLightbox();if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)});
})();
