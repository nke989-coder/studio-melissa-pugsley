(() => {
  const showcase = document.querySelector('.editorial-showcase');
  const intro = showcase?.querySelector('.showcase-intro');
  if (!showcase || !intro) return;

  const images = Array.from({ length: 16 }, (_, index) => `./gallery/${index + 1}.jpeg`);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gallerySpeedPxPerSecond = 18;

  const style = document.createElement('style');
  style.textContent = `
    .results-gallery{position:relative;overflow:hidden;margin:-54px 0 72px;padding:18px 0 10px}
    .results-gallery-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 clamp(24px,4vw,64px) 18px;color:#cbbdb5;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
    .results-gallery-head span:last-child{opacity:.62}
    .results-gallery-viewport{width:100%;overflow:hidden;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none}
    .results-gallery-viewport.is-dragging{cursor:grabbing}
    .results-gallery-track{display:flex;width:max-content;will-change:transform;transform:translate3d(0,0,0)}
    .results-gallery-group{display:flex;gap:14px;padding-right:14px;flex:0 0 auto}
    .result-card{width:clamp(220px,19vw,315px);aspect-ratio:4/5;padding:0;border:0;background:#302724;position:relative;overflow:hidden;cursor:zoom-in;flex:0 0 auto}
    .result-card::after{content:none!important;display:none!important}
    .result-card img{width:100%;height:100%;display:block;object-fit:cover;object-position:center;filter:saturate(.9) contrast(1.02);transition:transform .55s cubic-bezier(.2,.7,.2,1),filter .3s ease;-webkit-user-drag:none;user-select:none}
    .result-card:hover img,.result-card:focus-visible img{transform:scale(1.035);filter:saturate(1) contrast(1.03)}

    .gallery-lightbox{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:rgba(24,18,16,.28);backdrop-filter:blur(0);opacity:0;visibility:hidden;transition:opacity .32s ease,visibility .32s ease,background .42s ease,backdrop-filter .42s ease}
    .gallery-lightbox.is-open{opacity:1;visibility:visible;background:rgba(24,18,16,.76);backdrop-filter:blur(18px) saturate(.8)}
    .gallery-lightbox-stage{position:relative;width:100vw;height:100dvh;display:grid;place-items:center;padding:68px 76px 58px;overflow:hidden}
    .gallery-lightbox-shell{position:relative;display:grid;place-items:center;width:max-content;height:max-content;max-width:calc(100vw - 152px);max-height:calc(100dvh - 126px);padding:10px;border-radius:28px;background:linear-gradient(145deg,rgba(255,255,255,.17),rgba(255,255,255,.045));border:1px solid rgba(255,255,255,.18);box-shadow:0 38px 110px rgba(0,0,0,.5),0 12px 34px rgba(185,104,78,.18),inset 0 1px 0 rgba(255,255,255,.22);opacity:0;transform:scale(.94);transition:opacity .18s ease}
    .gallery-lightbox-shell.is-ready{opacity:1}
    .gallery-lightbox-shell.is-floating{animation:gallery-float 5.4s ease-in-out infinite}
    @keyframes gallery-float{0%,100%{transform:translate3d(0,0,0) rotate(0)}50%{transform:translate3d(0,-8px,0) rotate(.22deg)}}
    .gallery-lightbox-image{display:block;width:auto;height:auto;max-width:min(86vw,1180px);max-height:calc(100dvh - 150px);object-fit:contain;border-radius:18px;box-shadow:0 18px 52px rgba(0,0,0,.28);user-select:none;-webkit-user-drag:none;transition:opacity .18s ease}
    .gallery-lightbox-image.is-loading{opacity:.35}
    .gallery-lightbox-counter{display:none!important}
    .gallery-ghost{position:fixed;z-index:1002;object-fit:cover;margin:0;pointer-events:none;border-radius:3px;box-shadow:0 22px 75px rgba(0,0,0,.38);will-change:left,top,width,height,border-radius,transform,opacity;transition:left .52s cubic-bezier(.16,.84,.25,1),top .52s cubic-bezier(.16,.84,.25,1),width .52s cubic-bezier(.16,.84,.25,1),height .52s cubic-bezier(.16,.84,.25,1),border-radius .52s ease,transform .52s cubic-bezier(.16,.84,.25,1),opacity .2s ease}
    .gallery-lightbox-close,.gallery-lightbox-nav{border:1px solid rgba(255,255,255,.28);background:rgba(40,32,29,.5);color:#fff;display:grid;place-items:center;cursor:pointer;backdrop-filter:blur(10px);transition:background .2s ease,border-color .2s ease,transform .2s ease}
    .gallery-lightbox-close:hover,.gallery-lightbox-nav:hover{background:var(--clay);border-color:var(--clay)}
    .gallery-lightbox-close{position:absolute;top:18px;right:18px;width:46px;height:46px;border-radius:50%;font:300 25px/1 var(--sans);z-index:3}
    .gallery-lightbox-nav{position:absolute;top:50%;width:48px;height:56px;transform:translateY(-50%);border-radius:99px;font:300 27px/1 var(--serif);z-index:3}
    .gallery-lightbox-prev{left:14px}.gallery-lightbox-next{right:14px}
    body.gallery-open{overflow:hidden}

    @media(max-width:900px){.results-gallery{margin-top:-28px;margin-bottom:52px}.result-card{width:clamp(210px,34vw,290px)}.gallery-lightbox-stage{padding:64px 58px 56px}.gallery-lightbox-shell{max-width:calc(100vw - 116px);max-height:calc(100dvh - 120px)}.gallery-lightbox-image{max-width:calc(100vw - 136px);max-height:calc(100dvh - 146px)}}
    @media(max-width:560px){.results-gallery{margin:-22px 0 42px;padding-top:8px}.results-gallery-head{padding:0 20px 14px;font-size:8px;gap:12px;align-items:flex-start}.results-gallery-head span:first-child{max-width:52%}.results-gallery-head span:last-child{display:block!important;max-width:44%;text-align:right;line-height:1.35;opacity:.72}.results-gallery-group{gap:10px;padding-right:10px}.result-card{width:72vw;max-width:290px}.gallery-lightbox-stage{padding:58px 10px 48px}.gallery-lightbox-shell{padding:7px;border-radius:22px;max-width:calc(100vw - 20px);max-height:calc(100dvh - 106px)}.gallery-lightbox-image{max-width:calc(100vw - 34px);max-height:calc(100dvh - 122px);border-radius:15px}.gallery-lightbox-close{top:10px;right:10px;width:42px;height:42px}.gallery-lightbox-nav{width:40px;height:50px;background:rgba(40,32,29,.43)}.gallery-lightbox-prev{left:5px}.gallery-lightbox-next{right:5px}}
    @media(prefers-reduced-motion:reduce){.gallery-lightbox-shell.is-floating{animation:none}.gallery-ghost{transition:none}}
  `;
  document.head.appendChild(style);

  const gallery=document.createElement('section');
  gallery.className='results-gallery';
  gallery.setAttribute('aria-label','Galeria de resultados de cabelos');
  gallery.innerHTML=`<div class="results-gallery-head"><span>Resultados reais · cabelos</span><span>Toque ou clique para ampliar</span></div><div class="results-gallery-viewport"><div class="results-gallery-track"></div></div>`;
  intro.insertAdjacentElement('afterend',gallery);
  const viewport=gallery.querySelector('.results-gallery-viewport');
  const track=gallery.querySelector('.results-gallery-track');

  const buildGroup=(duplicate=false)=>{
    const group=document.createElement('div');
    group.className='results-gallery-group';
    if(duplicate)group.setAttribute('aria-hidden','true');
    images.forEach((src,index)=>{
      const button=document.createElement('button');
      button.type='button';button.className='result-card';button.dataset.galleryIndex=String(index);
      button.setAttribute('aria-label','Ampliar foto do resultado');
      if(duplicate)button.tabIndex=-1;
      const img=document.createElement('img');img.src=src;img.alt=duplicate?'':'Resultado de cabelo';img.loading='lazy';img.decoding='async';
      button.appendChild(img);group.appendChild(button);
    });
    return group;
  };
  track.append(buildGroup(false),buildGroup(true));

  let galleryX=0;
  let loopWidth=0;
  let lastFrame=performance.now();
  let hovering=false;
  let focusPaused=false;
  let dragging=false;
  let pointerId=null;
  let dragStartX=0;
  let dragStartGalleryX=0;
  let dragDistance=0;
  let suppressClick=false;

  const measureLoop=()=>{
    loopWidth=track.querySelector('.results-gallery-group')?.getBoundingClientRect().width||0;
    if(loopWidth){
      while(galleryX<=-loopWidth)galleryX+=loopWidth;
      while(galleryX>0)galleryX-=loopWidth;
      track.style.transform=`translate3d(${galleryX}px,0,0)`;
    }
  };
  const normalizeGalleryX=()=>{
    if(!loopWidth)return;
    while(galleryX<=-loopWidth)galleryX+=loopWidth;
    while(galleryX>0)galleryX-=loopWidth;
  };
  const galleryFrame=now=>{
    const delta=Math.min(40,now-lastFrame);
    lastFrame=now;
    const paused=dragging||hovering||focusPaused||reducedMotion||document.hidden;
    if(!paused&&loopWidth){
      galleryX-=gallerySpeedPxPerSecond*(delta/1000);
      normalizeGalleryX();
      track.style.transform=`translate3d(${galleryX}px,0,0)`;
    }
    requestAnimationFrame(galleryFrame);
  };

  requestAnimationFrame(()=>{measureLoop();requestAnimationFrame(galleryFrame)});
  window.addEventListener('resize',()=>requestAnimationFrame(measureLoop));
  gallery.querySelectorAll('img').forEach(img=>img.addEventListener('load',measureLoop,{once:true}));

  viewport.addEventListener('pointerenter',()=>{hovering=true});
  viewport.addEventListener('pointerleave',()=>{if(!dragging)hovering=false});
  viewport.addEventListener('focusin',()=>{focusPaused=true});
  viewport.addEventListener('focusout',event=>{if(!viewport.contains(event.relatedTarget))focusPaused=false});

  viewport.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    dragging=true;
    pointerId=event.pointerId;
    dragStartX=event.clientX;
    dragStartGalleryX=galleryX;
    dragDistance=0;
    suppressClick=false;
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture?.(event.pointerId);
  });
  viewport.addEventListener('pointermove',event=>{
    if(!dragging||event.pointerId!==pointerId)return;
    const dx=event.clientX-dragStartX;
    dragDistance=Math.max(dragDistance,Math.abs(dx));
    galleryX=dragStartGalleryX+dx;
    normalizeGalleryX();
    track.style.transform=`translate3d(${galleryX}px,0,0)`;
    if(dragDistance>6)suppressClick=true;
  });
  const endDrag=event=>{
    if(!dragging||event.pointerId!==pointerId)return;
    dragging=false;
    viewport.classList.remove('is-dragging');
    try{viewport.releasePointerCapture?.(event.pointerId)}catch(_){ }
    pointerId=null;
    if(event.pointerType!=='mouse')hovering=false;
    if(suppressClick)setTimeout(()=>{suppressClick=false},80);
  };
  viewport.addEventListener('pointerup',endDrag);
  viewport.addEventListener('pointercancel',endDrag);
  viewport.addEventListener('wheel',event=>{
    if(Math.abs(event.deltaX)>Math.abs(event.deltaY)||event.shiftKey){
      event.preventDefault();
      const delta=event.shiftKey&&Math.abs(event.deltaX)<1?event.deltaY:event.deltaX;
      galleryX-=delta;
      normalizeGalleryX();
      track.style.transform=`translate3d(${galleryX}px,0,0)`;
    }
  },{passive:false});

  const lightbox=document.createElement('div');
  lightbox.className='gallery-lightbox';lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');lightbox.setAttribute('aria-label','Resultado ampliado');
  lightbox.innerHTML=`<div class="gallery-lightbox-stage"><button class="gallery-lightbox-close" type="button" aria-label="Fechar galeria">×</button><button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Foto anterior">‹</button><div class="gallery-lightbox-shell"><img class="gallery-lightbox-image" alt="Resultado de cabelo" /></div><button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Próxima foto">›</button></div>`;
  document.body.appendChild(lightbox);

  const shell=lightbox.querySelector('.gallery-lightbox-shell');
  const lightboxImage=lightbox.querySelector('.gallery-lightbox-image');
  const closeButton=lightbox.querySelector('.gallery-lightbox-close');
  const prevButton=lightbox.querySelector('.gallery-lightbox-prev');
  const nextButton=lightbox.querySelector('.gallery-lightbox-next');
  let currentIndex=0,returnFocus=null,touchStartX=0,animating=false,renderToken=0,openedWithKeyboard=false;

  const imageCache=new Map();
  const ensureImage=index=>{
    const src=images[index];
    if(imageCache.has(src))return imageCache.get(src);
    const promise=new Promise((resolve,reject)=>{
      const img=new Image();
      img.decoding='async';
      img.onload=()=>resolve(src);
      img.onerror=reject;
      img.src=src;
      if(img.complete&&img.naturalWidth)resolve(src);
    });
    imageCache.set(src,promise);
    return promise;
  };

  const preloadNeighbors=()=>{
    [(currentIndex-1+images.length)%images.length,(currentIndex+1)%images.length].forEach(i=>ensureImage(i).catch(()=>{}));
  };

  const render=async(animate=false)=>{
    const token=++renderToken;
    const nextIndex=currentIndex;
    const nextSrc=images[nextIndex];
    lightboxImage.classList.add('is-loading');
    try{
      await ensureImage(nextIndex);
      if(token!==renderToken)return false;
      lightboxImage.src=nextSrc;
      lightboxImage.alt='Resultado de cabelo';
      try{await lightboxImage.decode?.()}catch(_){ }
      if(token!==renderToken)return false;
      lightboxImage.classList.remove('is-loading');
      if(animate&&!reducedMotion){
        lightboxImage.animate([{opacity:.35,transform:'scale(.985)'},{opacity:1,transform:'scale(1)'}],{duration:240,easing:'ease-out'});
      }
      preloadNeighbors();
      return true;
    }catch(_){
      if(token===renderToken)lightboxImage.classList.remove('is-loading');
      return false;
    }
  };

  const makeGhost=(rect,src)=>{
    const ghost=document.createElement('img');ghost.className='gallery-ghost';ghost.src=src;
    Object.assign(ghost.style,{left:`${rect.left}px`,top:`${rect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`});
    document.body.appendChild(ghost);return ghost;
  };
  const targetRect=()=>lightboxImage.getBoundingClientRect();

  const openLightbox=async(index,trigger)=>{
    if(animating)return;
    animating=true;currentIndex=index;returnFocus=trigger;openedWithKeyboard=trigger.matches(':focus-visible');
    lightbox.classList.add('is-open');document.body.classList.add('gallery-open');shell.classList.remove('is-ready','is-floating');
    const start=trigger.querySelector('img')?.getBoundingClientRect()||trigger.getBoundingClientRect();
    const loaded=await render(false);
    if(!loaded){shell.classList.add('is-ready');animating=false;return;}
    const reveal=()=>{
      const end=targetRect();
      if(reducedMotion||!start.width||!end.width){shell.classList.add('is-ready','is-floating');animating=false;closeButton.focus({preventScroll:true});return;}
      const ghost=makeGhost(start,images[currentIndex]);
      requestAnimationFrame(()=>Object.assign(ghost.style,{left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,borderRadius:'18px',transform:'rotate(.2deg)'}));
      setTimeout(()=>{shell.classList.add('is-ready','is-floating');ghost.style.opacity='0';setTimeout(()=>ghost.remove(),210);animating=false;closeButton.focus({preventScroll:true})},530);
    };
    requestAnimationFrame(reveal);
  };

  const closeLightbox=()=>{
    if(animating||!lightbox.classList.contains('is-open'))return;
    animating=true;
    shell.classList.remove('is-floating');
    focusPaused=false;
    hovering=false;
    lastFrame=performance.now();
    const start=targetRect();const targetImg=returnFocus?.querySelector('img');const end=targetImg?.getBoundingClientRect()||returnFocus?.getBoundingClientRect();
    const finish=()=>{
      renderToken+=1;
      lightbox.classList.remove('is-open');
      document.body.classList.remove('gallery-open');
      shell.classList.remove('is-ready');
      lightboxImage.classList.remove('is-loading');
      animating=false;
      focusPaused=false;
      hovering=false;
      lastFrame=performance.now();
      if(returnFocus?.isConnected){
        if(openedWithKeyboard)returnFocus.focus({preventScroll:true});
        else returnFocus.blur();
      }
    };
    if(reducedMotion||!end?.width){finish();return;}
    const ghost=makeGhost(start,images[currentIndex]);shell.classList.remove('is-ready');
    requestAnimationFrame(()=>Object.assign(ghost.style,{left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,borderRadius:'3px',transform:'rotate(-.2deg)'}));
    setTimeout(()=>{ghost.remove();finish()},540);
  };

  const move=async direction=>{
    if(animating)return;
    const previousIndex=currentIndex;
    currentIndex=(currentIndex+direction+images.length)%images.length;
    const ok=await render(true);
    if(!ok)currentIndex=previousIndex;
  };

  track.addEventListener('click',event=>{
    if(suppressClick){event.preventDefault();event.stopPropagation();return;}
    const button=event.target.closest('.result-card');if(button)openLightbox(Number(button.dataset.galleryIndex),button)
  });
  closeButton.addEventListener('click',closeLightbox);prevButton.addEventListener('click',()=>move(-1));nextButton.addEventListener('click',()=>move(1));
  lightbox.addEventListener('click',event=>{if(event.target===lightbox||event.target.classList.contains('gallery-lightbox-stage'))closeLightbox()});
  lightbox.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0]?.clientX||0},{passive:true});
  lightbox.addEventListener('touchend',event=>{const d=(event.changedTouches[0]?.clientX||0)-touchStartX;if(Math.abs(d)>55)move(d>0?-1:1)},{passive:true});
  document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('is-open'))return;if(event.key==='Escape')closeLightbox();if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)});
})();