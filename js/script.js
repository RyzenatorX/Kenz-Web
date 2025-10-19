// script.js - dark mode toggle, smooth scroll, reveal on scroll
const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const modeToggleButton = document.querySelector('.js-mode-toggle');
const modeToggleText = document.querySelector('.js-mode-toggle-text');

const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);
  if (response.length) response = response.replace(/'|"/g, '').trim();
  return response;
};

const applySetting = passedSetting => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  if(currentSetting){
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setButtonLabel(currentSetting);
  } else {
    setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY) || 'dark');
  }
}

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);
  switch(currentSetting){
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light': currentSetting = 'dark'; break;
    case 'dark': currentSetting = 'light'; break;
  }
  localStorage.setItem(STORAGE_KEY, currentSetting);
  return currentSetting;
}

const setButtonLabel = currentSetting => {
  if(modeToggleText) modeToggleText.innerText = `Switch to ${currentSetting === 'dark' ? 'light' : 'dark'} theme`;
  if(modeToggleButton) modeToggleButton.setAttribute('aria-pressed', currentSetting === 'dark');
}

if(modeToggleButton){
  modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    applySetting(toggleSetting());
  });
}

applySetting();

// smooth scrolling for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// reveal on scroll
const revealElements = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('is-visible');
  });
},{threshold:0.12,rootMargin:'0px 0px -10% 0px'});
revealElements.forEach(el => revealObserver.observe(el));