const form = document.getElementById('form');
const progress = document.getElementById('progress');
const sendButton = document.getElementById('send');
const status = document.getElementById('status');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const request = new XMLHttpRequest();
  const data = new FormData(form);
  progress.value = 0;
  status.textContent = 'Файл отправляется...';
  sendButton.disabled = true;

  function showError() {
    progress.value = 0;
    status.textContent = 'Не удалось загрузить файл. Попробуйте ещё раз.';
  }

  request.open('POST', form.action);
  request.timeout = 300000;

  request.upload.addEventListener('progress', function (event) {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  });

  request.addEventListener('load', function () {
    if (request.status >= 200 && request.status < 300) {
      progress.value = 1;
      status.textContent = 'Файл успешно загружен.';
    } else {
      showError();
    }
  });

  request.addEventListener('error', showError);
  request.addEventListener('timeout', showError);
  request.addEventListener('loadend', function () {
    sendButton.disabled = false;
  });

  request.send(data);
});
