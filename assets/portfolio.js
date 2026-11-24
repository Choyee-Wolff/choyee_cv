const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const cards = [...document.querySelectorAll('.project-card')];
  const status = document.querySelector('#filter-status');
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const selection = button.dataset.filter;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = selection !== 'all' && card.dataset.category !== selection; });
    const count = cards.filter(card => !card.hidden).length;
    status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
  });
}
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}

// Content stays visible when motion is reduced or observation is unavailable.
const timelineSteps = [...document.querySelectorAll('.timeline-step')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (timelineSteps.length && !motionPreference.matches && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  timelineSteps.forEach(step => {
    step.classList.add('will-reveal');
    reveal.observe(step);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      reveal.disconnect();
      timelineSteps.forEach(step => step.classList.remove('will-reveal'));
    }
  });
}
