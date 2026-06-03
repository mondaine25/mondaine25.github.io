/* HUSTER GAMES — interactions */

// Auto-load real icon PNGs if present in /assets/icons/<slug>.png
function loadIcon(el) {
  const slug = el.getAttribute('data-icon');
  if (!slug) return;
  const url = '/assets/icons/' + slug + '.png';
  const img = new Image();
  img.onload = () => {
    el.style.backgroundImage = "url('" + url + "')";
    el.classList.add('has-img');
  };
  img.src = url;
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
