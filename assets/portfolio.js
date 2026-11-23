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
