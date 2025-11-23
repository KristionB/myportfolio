function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Header scroll behavior and scrollspy
document.addEventListener('DOMContentLoaded', () => {
  const desktopNav = document.getElementById('desktop-nav');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-links a');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function onScroll() {
    const y = window.scrollY;
    // toggle scrolled class when past hero
    if (y > window.innerHeight * 0.15) {
      desktopNav.classList.add('scrolled');
    } else {
      desktopNav.classList.remove('scrolled');
    }

    // scrollspy: find current section
    let currentId = sections[0].id;
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
        currentId = sec.id;
        break;
      }
    }

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

// Organizations slider (NSBE)
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.org-slider');
  sliders.forEach(slider => {
    const track = slider.querySelector('.org-track');
    const slides = Array.from(track.children);
    slider.style.position = 'relative';
    track.style.display = 'flex';
    track.style.transition = 'transform 350ms ease';
    slides.forEach(s => { s.style.minWidth = '100%'; s.style.boxSizing = 'border-box'; });

    // dots
    const dots = document.createElement('div');
    dots.className = 'org-dots';
    slides.forEach((_,i)=>{ const b = document.createElement('button'); if(i===0) b.classList.add('active'); b.addEventListener('click', ()=> goTo(i)); dots.appendChild(b); });
    slider.appendChild(dots);

    // controls
    const prev = document.createElement('button'); prev.className='org-control prev'; prev.innerText='‹';
    const next = document.createElement('button'); next.className='org-control next'; next.innerText='›';
    prev.addEventListener('click', ()=> goTo(index-1)); next.addEventListener('click', ()=> goTo(index+1));
    slider.appendChild(prev); slider.appendChild(next);

    let index = 0; let timer = null;
    function update(){ track.style.transform = `translateX(${-index*100}%)`; Array.from(dots.children).forEach((d,i)=> d.classList.toggle('active', i===index)); }
    function goTo(i){ index = (i + slides.length) % slides.length; update(); }
    function start(){ timer = setInterval(()=> goTo(index+1), 3500); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }
    slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', start);

    // swipe
    let startX=0, dx=0;
    slider.addEventListener('touchstart', e=> startX = e.touches[0].clientX, {passive:true});
    slider.addEventListener('touchmove', e=> dx = e.touches[0].clientX - startX, {passive:true});
    slider.addEventListener('touchend', ()=> { if(Math.abs(dx)>50){ if(dx<0) goTo(index+1); else goTo(index-1); } startX=0; dx=0; });

    // keyboard
    document.addEventListener('keydown', e=>{ if(e.key==='ArrowLeft') goTo(index-1); if(e.key==='ArrowRight') goTo(index+1); });

    update(); start();
  });
});
