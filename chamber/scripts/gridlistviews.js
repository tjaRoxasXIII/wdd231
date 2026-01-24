const listButton = document.getElementById('list');
const gridButton = document.getElementById('grid');

listButton.addEventListener('click', () => {
  cards.classList.add('list-view');
});

gridButton.addEventListener('click', () => {
  cards.classList.remove('list-view');
});