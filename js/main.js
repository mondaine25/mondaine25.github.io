/* HUSTER GAMES — interactions */

// Icon loader — SVG por padrao, com upgrade para PNG se existir.
// Usa background-image inline com !important para vencer o atalho
// `background: rgba(...)` inline dos cards (que zerava a imagem ->
// icone invisivel). Corrigido Jul/2026.
function loadIcon(el) {
  const slug = el.getAttribute('data-icon');
  if (!slug) return;
  const svgUrl = "url('/assets/icons/" + slug + ".svg')";
  el.style.setProperty('--icon-bg', svgUrl);
  el.style.setProperty('background-image', svgUrl, 'important');
  el.style.setProperty('background-size', 'cover', 'important');
  el.style.setProperty('background-position', 'center', 'important');
  el.style.setProperty('background-color', 'transparent', 'important');
  el.classList.add('has-img');
  // Upgrade para PNG real se o usuario colocar um em /assets/icons/<slug>.png
  const pngUrl = '/assets/icons/' + slug + '.png';
  const img = new Image();
  img.onload = () => {
    el.style.setProperty('background-image', "url('" + pngUrl + "')", 'important');
  };
  img.src = pngUrl;
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach(loadIcon);
});

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item .faq-q').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
