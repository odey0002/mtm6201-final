const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.pet-card');
const resultCount = document.querySelector('[data-result-count]');
filters.forEach((filter) => filter.addEventListener('click', () => {
  const type = filter.dataset.filter;
  let count = 0;
  cards.forEach((card) => {
    const show = type === 'all' || card.dataset.type === type;
    card.hidden = !show;
    if (show) count += 1;
  });
  filters.forEach((button) => button.classList.toggle('is-active', button === filter));
  if (resultCount) resultCount.textContent = count;
}));

const modal = document.querySelector('#pet-modal');
const closeModal = () => { if (modal) { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); } };
document.querySelectorAll('[data-pet]').forEach((button) => button.addEventListener('click', () => {
  const petName = document.querySelector('[data-pet-name]');
  if (petName) petName.textContent = button.dataset.pet;
  if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); modal.querySelector('.modal-close').focus(); }
}));
document.querySelector('.modal-close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim() || 'there';
  const status = form.querySelector('.form-status');
  status.textContent = `Thanks, ${name}! Your message is ready for our team.`;
  form.reset();
});
