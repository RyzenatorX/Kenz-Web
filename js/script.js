// Theme + mobile nav script (paste ke js/script.js)
(function(){
  const body = document.documentElement; // toggling on root makes :root.light easy
  const modeToggle = document.querySelector('.js-mode-toggle');
  const modeText = document.querySelector('.js-mode-toggle-text');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  // Load saved theme
  const saved = localStorage.getItem('kenzx-theme');
  if (saved === 'light') body.classList.add('light');

  function updateModeUI(){
    const isLight = body.classList.contains('light');
    if(modeText){
      modeText.textContent = isLight ? 'Switch to dark' : 'Switch to light';
    }
    if(modeToggle){
      modeToggle.setAttribute('aria-pressed', String(isLight));
    }
  }
  updateModeUI();

  // Toggle theme
  if(modeToggle){
    modeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('kenzx-theme', isLight ? 'light' : 'dark');
      updateModeUI();
    });
  }

  // NAV toggle (mobile)
  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });

    // close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Small enhancement: keyboard nav close (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if(navToggle) navToggle.setAttribute('aria-expanded','false');
      }
    }
  });
})();
