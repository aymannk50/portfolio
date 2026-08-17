const lightbox=document.getElementById('lightbox');
const lightboxImg=lightbox.querySelector('img');
const closeBtn=lightbox.querySelector('button');
document.querySelectorAll('.work-card img').forEach(img=>{
  img.addEventListener('click',()=>{lightboxImg.src=img.src;lightboxImg.alt=img.alt;lightbox.classList.add('show');});
});
function closeLightbox(){lightbox.classList.remove('show');lightboxImg.src='';}
closeBtn.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const portfolioCards=document.querySelectorAll('.portfolio-grid-enhanced .work-card');
if('IntersectionObserver' in window){
  const portfolioObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        portfolioObserver.unobserve(entry.target);
      }
    });
  },{threshold:.18});
  portfolioCards.forEach(card=>portfolioObserver.observe(card));
}else{
  portfolioCards.forEach(card=>card.classList.add('is-visible'));
}
