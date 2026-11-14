const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');
const request = new XMLHttpRequest();

title.textContent = 'Загрузка опроса...';

function showError() {
  title.textContent = 'Не удалось загрузить опрос. Обновите страницу.';
}

request.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
request.responseType = 'json';
request.timeout = 60000;

request.addEventListener('load', function () {
  if (request.status !== 200 || !request.response) {
    showError();
    return;
  }

  const poll = request.response.data;
  title.textContent = poll.title;
  answers.innerHTML = '';

  for (const answer of poll.answers) {
    const button = document.createElement('button');
    button.classList.add('poll__answer');
    button.textContent = answer;

    button.addEventListener('click', function () {
      alert('Спасибо, ваш голос засчитан!');
    });

    answers.append(button);
  }
});

request.addEventListener('error', showError);
request.addEventListener('timeout', showError);
request.send();
