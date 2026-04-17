(function(){
'use strict';
var dot=document.getElementById('cur'),ring=document.getElementById('cur2');
var isMob=('ontouchstart' in window)||window.innerWidth<960;
if(dot&&!isMob){
  var mx=-100,my=-100,rx=-100,ry=-100;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.addEventListener('mouseover',function(e){var h=e.target.closest('a,button,[data-h],.gitem,.pcard,.sv-card,.chan,.proj-card,.pd-gal-item');dot.classList.toggle('big',!!h);ring.classList.toggle('big',!!h);});
}
var nav=document.getElementById('nav');
if(nav)window.addEventListener('scroll',function(){nav.classList.toggle('sc',scrollY>8);},{passive:true});
var ham=document.getElementById('hamburger'),mm=document.getElementById('mobile-menu');
if(ham&&mm){
  ham.addEventListener('click',function(){var o=mm.classList.toggle('open');ham.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');ham.classList.remove('open');document.body.style.overflow='';});});
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.07,rootMargin:'0px 0px -32px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s').forEach(function(r){io.observe(r);});
document.querySelectorAll('.count-up').forEach(function(el){
  var target=parseInt(el.dataset.target)||0,suffix=el.dataset.suffix||'';
  var io2=new IntersectionObserver(function(entries){if(!entries[0].isIntersecting)return;io2.unobserve(el);var start=null,dur=1400;(function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1),e2=1-Math.pow(1-p,3);el.textContent=Math.round(e2*target)+suffix;if(p<1)requestAnimationFrame(step);})(performance.now());},{threshold:.5});
  io2.observe(el);
});
document.querySelectorAll('.tilt').forEach(function(el){
  el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(800px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg) scale(1.02)';});
  el.addEventListener('mouseleave',function(){el.style.transform='perspective(800px) rotateY(0) rotateX(0) scale(1)';el.style.transition='transform .6s cubic-bezier(.23,1,.32,1)';});
  el.addEventListener('mouseenter',function(){el.style.transition='transform .15s';});
});
document.querySelectorAll('.btn,.n-cta').forEach(function(btn){
  btn.addEventListener('mousemove',function(e){var r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.22,y=(e.clientY-r.top-r.height/2)*.22;btn.style.transform='translate('+x+'px,'+y+'px) translateY(-2px)';});
  btn.addEventListener('mouseleave',function(){btn.style.transform='';});
});
var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbCount=document.getElementById('lb-count'),lbPhotos=[],lbIdx=0;
window.openLightbox=function(p,i){lbPhotos=p;lbIdx=i;renderLb();lb.classList.add('open');document.body.style.overflow='hidden';};
function renderLb(){var src=lbPhotos[lbIdx];lbImg.innerHTML=src?'<img src="'+src+'" alt="Foto do projeto"/>':'<div class="lb-ph"><p>Em breve</p></div>';if(lbCount)lbCount.textContent=(lbIdx+1)+' / '+lbPhotos.length;}
function closeLb(){lb.classList.remove('open');document.body.style.overflow='';}
if(lb){document.getElementById('lb-close').addEventListener('click',closeLb);lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});document.getElementById('lb-prev').addEventListener('click',function(){lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length;renderLb();});document.getElementById('lb-next').addEventListener('click',function(){lbIdx=(lbIdx+1)%lbPhotos.length;renderLb();});document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft'){lbIdx=(lbIdx-1+lbPhotos.length)%lbPhotos.length;renderLb();}if(e.key==='ArrowRight'){lbIdx=(lbIdx+1)%lbPhotos.length;renderLb();}});}
var cb=document.getElementById('cookie-banner');
if(cb){if(!localStorage.getItem('cookie-consent'))setTimeout(function(){cb.classList.add('show');},1200);var ca=document.getElementById('cookie-accept'),cd=document.getElementById('cookie-decline');if(ca)ca.addEventListener('click',function(){localStorage.setItem('cookie-consent','accepted');cb.classList.remove('show');});if(cd)cd.addEventListener('click',function(){localStorage.setItem('cookie-consent','declined');cb.classList.remove('show');});}
})();
