const loading = document.querySelector('.loading');
const app = document.querySelector('.app');

setTimeout(() => {
  loading.style.display = 'none';
  app.classList.remove('hidden');
}, 1500);
loading.classList.add('hide');

setTimeout(() => {
  loading.style.display = 'none';
  app.classList.remove('hidden');
}, 500);
