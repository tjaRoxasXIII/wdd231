const menuButton = document.getElementById('menu');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('show');
  menuButton.textContent = isOpen ? '✖' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

const listButton = document.getElementById('list');
const gridButton = document.getElementById('grid');

listButton.addEventListener('click', () => {
  cards.classList.add('list-view');
});

gridButton.addEventListener('click', () => {
  cards.classList.remove('list-view');
});
