let BRANDS = [];
let APP_CONFIG = {};
let activeBrand = null;
let activeFilter = 'All';

document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
  try {
    const res = await fetch('data.json');
    const data = await res.json();
    APP_CONFIG = data.app || {};
    BRANDS = data.brands || [];
    
    applyAppConfig();
    renderBrands();
  } catch (err) {
    console.error('Failed to load data.json', err);
  }
}

function applyAppConfig() {
  if (APP_CONFIG.title) document.title = APP_CONFIG.title;
  
  const hdrLogo = document.querySelector('.hdr-logo');
  if (hdrLogo) {
    if (APP_CONFIG.headerLogo) hdrLogo.src = APP_CONFIG.headerLogo;
    if (APP_CONFIG.headerAlt) hdrLogo.alt = APP_CONFIG.headerAlt;
  }
  
  const backBtn = document.getElementById('backBtn');
  if (backBtn && APP_CONFIG.backButtonText) {
    // preserve the SVG
    const svg = backBtn.querySelector('svg');
    backBtn.innerHTML = '';
    if (svg) backBtn.appendChild(svg);
    backBtn.appendChild(document.createTextNode(' ' + APP_CONFIG.backButtonText));
  }
  
  const eyebrow = document.querySelector('.brands-hero-eyebrow');
  if (eyebrow && APP_CONFIG.heroEyebrow) eyebrow.textContent = APP_CONFIG.heroEyebrow;
  
  const h1 = document.querySelector('.brands-hero h1');
  if (h1 && APP_CONFIG.heroTitle) h1.textContent = APP_CONFIG.heroTitle;
  
  const heroDesc = document.querySelector('.brands-hero p');
  if (heroDesc && APP_CONFIG.heroDesc) heroDesc.textContent = APP_CONFIG.heroDesc;
}
