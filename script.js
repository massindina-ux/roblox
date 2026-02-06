const navItems = document.querySelectorAll('.nav-item');
const tabs = document.querySelectorAll('.tab');
const launchButton = document.getElementById('launch-game');
const loadingModal = document.getElementById('loading-modal');
const gamePlay = document.getElementById('game-play');
const gameStatus = document.getElementById('game-status');
const star = document.getElementById('star');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const playArea = document.getElementById('play-area');

let score = 0;
let timeLeft = 60;
let timerId = null;

const showTab = (tabName) => {
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.tab === tabName);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.id === tabName);
  });
};

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    showTab(item.dataset.tab);
  });
});

const randomPosition = () => {
  const areaRect = playArea.getBoundingClientRect();
  const size = 52;
  const maxX = areaRect.width - size;
  const maxY = areaRect.height - size;
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
};

const startGame = () => {
  score = 0;
  timeLeft = 60;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  gameStatus.textContent = 'Spel gestart';
  gamePlay.classList.remove('hidden');
  randomPosition();

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      gameStatus.textContent = `Klaar! Score: ${score}`;
    }
  }, 1000);
};

launchButton.addEventListener('click', () => {
  loadingModal.classList.remove('hidden');
  gameStatus.textContent = 'Laden...';

  setTimeout(() => {
    loadingModal.classList.add('hidden');
    startGame();
  }, 1500);
});

star.addEventListener('click', () => {
  if (timeLeft <= 0) {
    return;
  }

  score += 5;
  scoreEl.textContent = score;
  randomPosition();
});

window.addEventListener('resize', () => {
  if (!gamePlay.classList.contains('hidden')) {
    randomPosition();
  }
});
