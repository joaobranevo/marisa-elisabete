/* Marisa Elisabete Arquitetura — main.js v3 */
(function(){
'use strict';

/* ── Smooth scroll with momentum ─────────────────────── */
// Simple native smooth scroll already in CSS; add JS momentum for desktop
let lerpY = 0, targetY = 0, rafId;
const isMobile = () => window.innerWidth < 960 || 'ontouchstart' in window;

function smoothScroll(){
  if(isMobile()) return; // native scroll on mobile
  lerpY += (targetY - lerpY) * 0.09;
  if(Math.abs(targetY - lerpY) < 0.5) lerpY = targetY;
  document.documentElement.style.setProperty('--scroll-y', lerpY + 'px');
  rafId = requestAnimationFrame(smoothScroll);
}

if(!isMobile()){
  // We'll use CSS scroll-snap + native smooth; skip body hijacking to avoid bugs
  // Just enhance cursor & micro-interactions
}

/* ── Cursor ──────────────────────────────────────────── */
const dot = document.getElementById('cur');
const ring = document.getElementById('cur2');
if(dot && !isMobile()){
  let mx=-100, my=-100, rx=-100, ry=-100;
  document.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function loop(){
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    const h = e.target.closest('a,button,[data-h],.gitem,.pcard,.sv-card,.chan');
    dot.classList.toggle('big', !!h);
    ring.classList.toggle('big', !!h);
  });
}

/* ── Nav glass scroll ────────────────────────────────── */
const nav = document.getElementById('nav');
if(nav){
  window.addEventListener('scroll', ()=>nav.classList.toggle('sc', scrollY > 8), {passive:true});
}

/* ── Active nav link ─────────────────────────────────── */
const path = location.pathname.replace(/\/$/,'');
document.querySelectorAll('.n-links a').forEach(a=>{
  const hp = a.getAttribute('href').replace(/\/$/,'').replace(/^\.\.\//, '/');
  const rel = a.getAttribute('href');
  // Match current path
  if(path === hp || (path === '' && (rel === './' || rel === '/' || rel === '')) ||
     path.endsWith(rel.replace('../','').replace(/\/$/,''))){
    a.setAttribute('aria-current','page');
  }
});

/* ── Mobile full-page menu ───────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click', ()=>{
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll reveal ───────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
if(revealEls.length){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  },{threshold:0.07, rootMargin:'0px 0px -32px 0px'});
  revealEls.forEach(r => io.observe(r));
}

/* ── Count-up ────────────────────────────────────────── */
document.querySelectorAll('.count-up').forEach(el=>{
  const target = parseInt(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || '';
  const io2 = new IntersectionObserver(([e])=>{
    if(!e.isIntersecting) return;
    io2.unobserve(el);
    let start=null, dur=1400;
    (function step(ts){
      if(!start) start = ts;
      const p = Math.min((ts-start)/dur, 1);
      const ease = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if(p < 1) requestAnimationFrame(step);
    })(performance.now());
  },{threshold:.5});
  io2.observe(el);
});

/* ── 3D Tilt ─────────────────────────────────────────── */
document.querySelectorAll('.tilt').forEach(el=>{
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.02)`;
  });
  el.addEventListener('mouseleave', ()=>{
    el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    el.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
  });
  el.addEventListener('mouseenter', ()=>{ el.style.transition = 'transform .15s'; });
});

/* ── Magnetic buttons ────────────────────────────────── */
document.querySelectorAll('.btn,.n-cta').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2)  * 0.22;
    const y = (e.clientY - r.top  - r.height/2) * 0.22;
    btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = ''; });
});

/* ── Lightbox ────────────────────────────────────────── */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCount = document.getElementById('lb-count');
let lbPhotos=[], lbIdx=0;

window.openLightbox = function(photos, idx){
  lbPhotos = photos; lbIdx = idx;
  renderLb();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};
function renderLb(){
  const src = lbPhotos[lbIdx];
  lbImg.innerHTML = src
    ? `<img src="${src}" alt="Foto do projeto"/>`
    : `<div class="lb-ph"><p>Imagem em breve</p></div>`;
  if(lbCount) lbCount.textContent = `${lbIdx+1} / ${lbPhotos.length}`;
}
function closeLb(){ lb.classList.remove('open'); document.body.style.overflow = ''; }

if(lb){
  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', e=>{ if(e.target===lb) closeLb(); });
  document.getElementById('lb-prev').addEventListener('click', ()=>{
    lbIdx = (lbIdx-1+lbPhotos.length) % lbPhotos.length; renderLb();
  });
  document.getElementById('lb-next').addEventListener('click', ()=>{
    lbIdx = (lbIdx+1) % lbPhotos.length; renderLb();
  });
  document.addEventListener('keydown', e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLb();
    if(e.key==='ArrowLeft') { lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length; renderLb(); }
    if(e.key==='ArrowRight'){ lbIdx=(lbIdx+1)%lbPhotos.length; renderLb(); }
  });
}

/* ── Cookie banner ───────────────────────────────────── */
const banner = document.getElementById('cookie-banner');
if(banner){
  if(!localStorage.getItem('cookie-consent')){
    setTimeout(()=> banner.classList.add('show'), 1200);
  }
  const accept = document.getElementById('cookie-accept');
  const decline = document.getElementById('cookie-decline');
  if(accept) accept.addEventListener('click', ()=>{
    localStorage.setItem('cookie-consent','accepted');
    banner.classList.remove('show');
  });
  if(decline) decline.addEventListener('click', ()=>{
    localStorage.setItem('cookie-consent','declined');
    banner.classList.remove('show');
  });
}

})();
