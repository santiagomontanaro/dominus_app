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
  const storedDay = localStorage.getItem('day')
  const storedTitle = localStorage.getItem('dailyTitle')

  if (storedDay && storedTitle) {
    day = parseInt(storedDay)
    dailyTitle.textContent = storedTitle
    dayCount.textContent = `Día ${day}`
    app.classList.remove('hidden')
    app.style.display = 'flex'
    title.classList.add('hidden')
    title.style.display = 'none'

    startCounting()
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
      guardarProgreso(); 
    }
  }, 8000); 
}

app.classList.add('hidden')
app.style.display = 'none'

title.addEventListener('click', () => {
  title.style.opacity = 0

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
})

document.addEventListener('DOMContentLoaded', loadProgress)