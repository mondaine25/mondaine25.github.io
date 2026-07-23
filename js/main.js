/* HUSTER GAMES — interactions */

// Icon loader — sets the CSS custom property --icon-bg that style.css reads
// (.has-img { background-image: var(--icon-bg) }). Antes usava
// el.style.backgroundImage, que o CSS sobrescrevia com var(--icon-bg)
// indefinida -> icone invisivel. Corrigido Jul/2026.
function loadIcon(el) {
  const slug = el.getAttribute('data-icon');
  if (!slug) return;
  const svgUrl = "url('/assets/icons/" + slug + ".svg')";
  // Set as INLINE longhand with priority so it overrides the card's
  // inline `background: rgba(...)` shorthand (which resets background-image
  // to none at inline priority, beating the external .has-img rule).
  el.style.setProperty('--icon-bg', svgUrl);
  el.style.setProperty('background-image', svgUrl, 'important');
  el.style.setProperty('background-size', 'cover', 'important');
  el.style.setProperty('background-position', 'center', 'important');
  el.style.setProperty('background-color', 'transparent', 'important');
  el.classList.add('has-img');
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
