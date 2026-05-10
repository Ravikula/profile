/* ============================================================
   RAVIKULA SILVA — POWER SYSTEMS & RENEWABLES
   main.js
   ============================================================ */

/* ------------------------------------------------------------
   1. THEME TOGGLE
   Reads saved preference from localStorage, applies on load,
   and toggles between light / dark on button click.
   ------------------------------------------------------------ */
(function initTheme() {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeBtn');
  const lbl    = document.getElementById('themeLbl');
  const STORE  = 'rs-power-theme';

  const saved  = localStorage.getItem(STORE) || 'light';
  html.setAttribute('data-theme', saved);
  lbl.textContent = saved === 'dark' ? 'Dark' : 'Light';

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem(STORE, next);
    lbl.textContent = next === 'dark' ? 'Dark' : 'Light';
  });
})();

/* ------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   Fills the 3px bar at the top of the viewport as the user
   scrolls through the page.
   ------------------------------------------------------------ */
(function initProgressBar() {
  const bar = document.getElementById('prog');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();

/* ------------------------------------------------------------
   3. SCROLL REVEAL
   Watches .reveal elements with IntersectionObserver and adds
   the .visible class when they enter the viewport.
   ------------------------------------------------------------ */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ------------------------------------------------------------
   4. ACTIVE NAV LINK
   Highlights the nav link whose section is currently in view.
   Uses a simple scroll position check against each section's
   offsetTop with a 80px offset for the fixed nav height.
   ------------------------------------------------------------ */
(function initActiveNav() {
  const links    = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }, { passive: true });
})();

/* ------------------------------------------------------------
   5. MOBILE NAV TOGGLE
   Opens / closes the mobile navigation panel.
   closeMob() is also called from inline onclick attributes
   on the mobile nav links, so it must be global.
   ------------------------------------------------------------ */
(function initMobileNav() {
  const ham    = document.getElementById('ham');
  const mobileNav = document.getElementById('mobileNav');

  ham.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
})();

function closeMob() {
  document.getElementById('mobileNav').classList.remove('open');
}

/* ------------------------------------------------------------
   6. VIDEO EMBEDS
   ------------------------------------------------------------ */
function loadHeroVid() {
  const container = document.getElementById('heroVid');
  container.innerHTML = `
    <iframe
      width="100%"
      style="aspect-ratio:16/9;display:block"
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}

function loadMfgVid() {
  const container = document.getElementById('mfgVid');
  container.innerHTML = `
    <iframe
      width="100%"
      style="aspect-ratio:16/9;display:block"
      src="https://www.youtube.com/embed/YOUR_MFG_VIDEO_ID?autoplay=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}
