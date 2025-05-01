const title = document.querySelector('.mainIntro');
const app = document.querySelector('.mainApp');
const resetButton = document.querySelector('.mainApp__resetBtn');
const dailyTitle = document.querySelector('.mainApp__dailyTitle');
/* const titleToday = titles[day - 1] */
const dayCount = document.querySelector('.mainApp__dayCount');

const titles = [
  "Novato", // Día 1
  "Despertar", // Día 2
  "Fuerza interior", // Día 3
  "Resistencia", // Día 4
  "Determinación", // Día 5
  "Convicción", // Día 6
  "Hombre Pro", // Día 7
]

let day = 1
let intervalId = null

function loadProgress() {
  const storedStartDate = localStorage.getItem('startDate');

  if (storedStartDate) {
    const now = Date.now();
    const elapsedMs = now - parseInt(storedStartDate);
    const elapsedDays = Math.floor(elapsedMs / 86400000); // 1 día en ms

    day = Math.min(1 + elapsedDays, titles.length);
    dayCount.textContent = `Día ${day}`;
    dailyTitle.textContent = titles[day - 1] || "Título no disponible";
    app.classList.remove('hidden');
    app.classList.add('visible');
    app.style.display = 'flex';
    title.classList.add('hidden');
    title.style.display = 'none';

  }
}

function saveProgress() {
  localStorage.setItem('day', day)
  localStorage.setItem('dailyTitle', dailyTitle.textContent)
}

function startCounting() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    day++;
    dayCount.textContent = `Día ${day}`;

    if (day <= titles.length) {
      const titleToday = titles[day - 1];
      dailyTitle.textContent = titleToday;
      saveProgress();
    }
  }, 86400000);
}

app.classList.add('hidden')
app.style.display = 'none'

title.addEventListener('click', () => {
  title.style.opacity = 0
  if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', Date.now());
  }

  setTimeout(() => {
    title.classList.add('hidden')
    app.classList.remove('hidden')
    app.classList.add('visible')
    title.style.display = 'none'
    app.style.display = 'flex'

    startCounting()
  }, 500)

})

resetButton.addEventListener('click', () => {
  day = 1
  dayCount.textContent = `Día ${day}`
  dailyTitle.textContent = 'Novato'

  if (intervalId) clearInterval(intervalId);

  localStorage.removeItem('day')
  localStorage.removeItem('dailyTitle')

  title.style.display = 'block'
  app.classList.remove('visible')
  app.style.display = 'none'
  title.classList.remove('hidden')
  title.style.opacity = 1
  localStorage.removeItem('startDate');

})

document.addEventListener('DOMContentLoaded', loadProgress)