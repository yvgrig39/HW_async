const loader = document.getElementById('loader');
const items = document.getElementById('items');
const request = new XMLHttpRequest();

function showError() {
  loader.classList.remove('loader_active');
  items.textContent = 'Не удалось загрузить курсы валют. Обновите страницу.';
}

request.open('GET', 'http://localhost:3333/slow-get-courses');
request.responseType = 'json';
request.timeout = 60000;

request.addEventListener('load', function () {
  if (request.status !== 200 || !request.response) {
    showError();
    return;
  }

  const currencies = request.response.response.Valute;
  items.innerHTML = '';

  for (const code in currencies) {
    const currency = currencies[code];
    const item = document.createElement('div');
    item.classList.add('item');

    const currencyCode = document.createElement('div');
    currencyCode.classList.add('item__code');
    currencyCode.textContent = currency.CharCode;

    const value = document.createElement('div');
    value.classList.add('item__value');
    value.textContent = currency.Value;

    const rubles = document.createElement('div');
    rubles.classList.add('item__currency');
    rubles.textContent = 'руб.';

    item.append(currencyCode, value, rubles);
    items.append(item);
  }

  loader.classList.remove('loader_active');
});

request.addEventListener('error', showError);
request.addEventListener('timeout', showError);
request.send();
