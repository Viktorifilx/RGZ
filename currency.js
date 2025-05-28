const rubInput = document.getElementById('rubInput');
const usdInput = document.getElementById('usdInput');
const rateInfo = document.getElementById('rateInfo');
const chartCanvas = document.getElementById('chart');
const selectedDate = document.getElementById('selectedDate');

let currentRate = 0;
let chart;

// Загружаем текущий курс с сайта ЦБ РФ
async function fetchCurrentRate() {
  try {
    const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await res.json();
    currentRate = data.Valute.USD.Value;
    rateInfo.textContent = `1 USD = ${currentRate.toFixed(2)} ₽`;

    rubInput.addEventListener('input', () => {
      usdInput.value = (rubInput.value / currentRate).toFixed(2);
    });

    usdInput.addEventListener('input', () => {
      rubInput.value = (usdInput.value * currentRate).toFixed(2);
    });
  } catch (error) {
    rateInfo.textContent = 'Ошибка загрузки курса.';
    console.error('Ошибка при получении курса:', error);
  }
}

// Используем фейковые данные для графика за 30 дней
function fetchHistoricalData() {
  const data = [];

  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formatted = date.toISOString().split('T')[0];
    const rate = 89 + Math.random() * 4; // курс от 89 до 93
    data.push({ date: formatted, value: rate });
  }

  drawChart(data);
}

// Отрисовка графика
function drawChart(data) {
  const labels = data.map(d => d.date);
  const values = data.map(d => d.value.toFixed(2));

  chart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Курс USD',
        data: values,
        backgroundColor: '#1ee1b2',
        borderRadius: 6
      }]
    },
    options: {
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          selectedDate.textContent = `Дата: ${labels[index]}, курс: ${values[index]} ₽`;
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Запуск
fetchCurrentRate();
fetchHistoricalData();
