// Simple timed click-the-target game
let score = 0;
let timeLeft = 30; // seconds
let timerInterval = null;

const target = document.getElementById('target');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const restartBtn = document.getElementById('restart');
const area = document.getElementById('game-area');

function placeTargetRandom() {
  const rect = area.getBoundingClientRect();
  const tW = 48, tH = 48;
  const x = Math.random() * (rect.width - tW) + tW/2;
  const y = Math.random() * (rect.height - tH) + tH/2;
  target.style.left = x + 'px';
  target.style.top = y + 'px';
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  placeTargetRandom();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      target.style.display = 'none';
      alert('Time up! Score: ' + score);
    }
  }, 1000);
  target.style.display = 'block';
}

target.addEventListener('click', () => {
  if (timeLeft <= 0) return;
  score++;
  scoreEl.textContent = score;
  placeTargetRandom();
});

restartBtn.addEventListener('click', () => {
  startGame();
});

// keyboard accessibility
target.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    target.click();
  }
});

// init
window.addEventListener('load', () => {
  startGame();
  // reposition on resize
  window.addEventListener('resize', placeTargetRandom);
});