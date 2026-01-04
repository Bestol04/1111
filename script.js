const loading = document.querySelector('.loading');
const app = document.querySelector('.app');
const btn = document.getElementById("planetBtn");
const counterEl = document.getElementById("counter");

let count = 0;

// Telegram WebApp haptic (если доступен)
const tg = window.Telegram?.WebApp;

// Загрузка
function hideLoading() {
  loading.classList.add('hide'); // плавное исчезновение
  setTimeout(() => {
    loading.style.display = 'none';
    app.classList.remove('hidden');
  }, 500); // совпадает с transition в CSS
}

// Запуск загрузки через 1.5 сек
setTimeout(hideLoading, 1500);

// Клик по планете
btn.addEventListener("click", (e) => {
  count++;
  counterEl.textContent = count;

  // Haptic feedback
  if (tg?.HapticFeedback?.impactOccurred) {
    tg.HapticFeedback.impactOccurred("light");
  }

  createParticles(e.clientX, e.clientY);
});

// Частицы
function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;

    p.style.left = x + "px";
    p.style.top = y + "px";

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    p.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
      duration: 600,
      easing: "ease-out"
    });

    setTimeout(() => p.remove(), 600);
  }
}
