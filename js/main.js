/* HUSTER GAMES — interactions */

// Icon loader: SVG by default, swap to PNG if user dropped one in /assets/icons/<slug>.png
function loadIcon(el) {
  const slug = el.getAttribute('data-icon');
  if (!slug) return;
  const svgUrl = '/assets/icons/' + slug + '.svg';
  // Apply SVG immediately so users always see styled icon (no emoji jank)
  el.style.backgroundImage = "url('" + svgUrl + "')";
  el.classList.add('has-img');
  // Try to upgrade to real PNG if it exists
  const pngUrl = '/assets/icons/' + slug + '.png';
  const img = new Image();
  img.onload = () => {
    el.style.backgroundImage = "url('" + pngUrl + "')";
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
