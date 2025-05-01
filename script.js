const title = document.querySelector('.mainIntro');
const app = document.querySelector('.mainApp');
const resetButton = document.querySelector('.mainApp__resetBtn');
const dailyTitle = document.querySelector('.mainApp__dailyTitle');
const dayCount = document.querySelector('.mainApp__dayCount');
const timer = document.querySelector('.mainApp__timer'); // Asegúrate de tener este contenedor en tu HTML

const titles = [
  "Novato", 
  "Despertar", 
  "Fuerza interior", 
  "Resistencia", 
  "Determinación",
  "Convicción", 
  "Guerrero de la Voluntad Inquebrantable", 
];

let intervalId = null;

function loadProgress() {
  const storedStartDate = localStorage.getItem('startDate');
  if (storedStartDate) {
    const now = Date.now();
    const elapsedMs = now - parseInt(storedStartDate);
    const elapsedDays = Math.floor(elapsedMs / 86400000); 

    const day = Math.min(1 + elapsedDays, titles.length);
    dayCount.textContent = `Día ${day}`;
    dailyTitle.textContent = titles[day - 1] || "Título no disponible";

    app.classList.remove('hidden');
    app.classList.add('visible');
    app.style.display = 'flex';
    title.classList.add('hidden');
    title.style.display = 'none';
  }
}

function startCounting() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    updateTimePassed();
  }, 1000);
}

function updateTimePassed() {
  const storedStartDate = localStorage.getItem('startDate');
  if (!storedStartDate) return;

  const now = Date.now();
  const elapsedMs = now - parseInt(storedStartDate);

  const days    = Math.floor(elapsedMs / (1000 * 60 * 60 * 24)); 
  const hours   = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24); 
  const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedMs / 1000) % 60);

  timer.textContent = `Tiempo: ${days}d ${hours}h ${minutes}m ${seconds}s`;

  const percent = ((hours * 3600 + minutes * 60 + seconds) / 86400) * 100;

  const circle = document.querySelector('.mainApp__progressCircle');
  if (circle) {
    circle.style.setProperty('--progress', `${percent}%`);
  }
}

app.classList.add('hidden');
app.style.display = 'none';

title.addEventListener('click', () => {
  title.style.opacity = 0;

  if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', Date.now());
  }

  setTimeout(() => {
    title.classList.add('hidden');
    app.classList.remove('hidden');
    app.classList.add('visible');
    title.style.display = 'none';
    app.style.display = 'flex';

    startCounting();
  }, 500);
});

resetButton.addEventListener('click', () => {
  day = 1;
  dayCount.textContent = `Día ${day}`;
  dailyTitle.textContent = titles[0];

  if (intervalId) clearInterval(intervalId);
  localStorage.removeItem('startDate'); 

  title.style.display = 'block';
  title.classList.remove('hidden');
  title.style.opacity = 1;
  app.classList.remove('visible');
  app.style.display = 'none';


  startCounting(); 
});

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  startCounting();
});
