const menuButton = document.getElementById('menu');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('show');
  menuButton.textContent = isOpen ? '✖' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
});