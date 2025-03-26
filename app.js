const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
let score = 0;
let targetSize = 30; // Taille par défaut du carré

// Change la position et la taille du carré
function moveTarget() {
  const gameArea = document.getElementById('gameArea');
  const areaWidth = gameArea.clientWidth;
  const areaHeight = gameArea.clientHeight;

  const x = Math.floor(Math.random() * (areaWidth - targetSize));
  const y = Math.floor(Math.random() * (areaHeight - targetSize));

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  target.style.width = `${targetSize}px`;
  target.style.height = `${targetSize}px`;
}

// Écoutez les clics sur le carré
target.addEventListener('click', () => {
  score++;
  scoreDisplay.textContent = score;
  moveTarget();
});

// Gérer les boutons de difficulté
document.getElementById('easy').addEventListener('click', () => {
  targetSize = 30; // Taille normale
  moveTarget(); // Réinitialise la position
});

document.getElementById('hard').addEventListener('click', () => {
  targetSize = 15; // Taille plus petite
  moveTarget(); // Réinitialise la position
});

// Position initiale du carré
moveTarget();
