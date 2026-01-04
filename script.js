// ===== ЭЛЕМЕНТЫ =====
const loading = document.querySelector('.loading');
const app = document.querySelector('.app');
const btn = document.getElementById("planetBtn");
const counterEl = document.getElementById("counter");

let count = 0;

// Telegram WebApp
const tg = window.Telegram?.WebApp;

// ===== ЗАГРУЗКА =====
function hideLoading() {
  loading.classList.add('hide'); // плавное исчезновение
  setTimeout(() => {
    loading.style.display = 'none';
    app.classList.remove('hidden');

    // Плавное появление планеты
    btn.style.opacity = 0;
    btn.style.transform = "scale(0.8)";
    btn.style.transition = "all 0.5s ease-out";
    requestAnimationFrame(() => {
      btn.style.opacity = 1;
      btn.style.transform = "scale(1)";
    });
  }, 500);
}
setTimeout(hideLoading, 3000);

// ===== АУДИО =====
let bgMusic; // аудио создаётся динамически

function playMusicOnce() {
  if (!bgMusic) {
    bgMusic = new Audio("music/bg.mp3"); // путь к файлу
    bgMusic.loop = true;
    bgMusic.volume = 0.05; // низкая громкость
    bgMusic.play().catch(() => console.log("Тапните для воспроизведения музыки"));
  }
}

// ===== КЛИК / ТАЧ =====
function handleTap(e) {
  e.preventDefault(); // блокируем масштаб и выделение
  const touch = e.touches ? e.touches[0] : e;

  // Запускаем музыку только при первом клике
  playMusicOnce();

  // +1
  count++;
  counterEl.textContent = count;

  // Анимация удара
  btn.classList.remove("hit");
  void btn.offsetWidth; // перезапуск анимации
  btn.classList.add("hit");

  // Вибрация (Telegram)
  if (tg?.HapticFeedback?.impactOccurred) {
    tg.HapticFeedback.impactOccurred("light");
  }

  // Частицы и +1
  createParticles(touch.clientX, touch.clientY);
  createPlusOne(touch.clientX, touch.clientY);
}

// Добавляем и click и touchstart
btn.addEventListener("click", handleTap);
btn.addEventListener("touchstart", handleTap, { passive: false });

// ===== ЧАСТИЦЫ =====
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

    p.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
      ],
      {
        duration: 600,
        easing: "ease-out"
      }
    );

    setTimeout(() => p.remove(), 600);
  }
}

// ===== +1 =====
function createPlusOne(x, y) {
  const plus = document.createElement("div");
  plus.textContent = "+1";
  plus.style.position = "absolute";
  plus.style.left = x + "px";
  plus.style.top = y + "px";
  plus.style.color = "#ffdca8";
  plus.style.fontSize = "24px";
  plus.style.fontWeight = "bold";
  plus.style.pointerEvents = "none";
  plus.style.textShadow = "0 0 10px rgba(255,220,150,0.8)";

  document.body.appendChild(plus);

  plus.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: "translateY(-40px)", opacity: 0 }
    ],
    {
      duration: 800,
      easing: "ease-out"
    }
  );

  setTimeout(() => plus.remove(), 800);
}

// ===== ЖЕСТЫ И ЗУМ =====
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());
document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

