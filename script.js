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
