// ===== ЭЛЕМЕНТЫ =====
const loading = document.querySelector('.loading');
const app = document.querySelector('.app');
const btn = document.getElementById("planetBtn");
const counterEl = document.getElementById("counter");

let count = 0;

// Telegram WebApp
const tg = window.Telegram?.WebApp;

// ===== ЗАГРУЗОЧНЫЙ ЭКРАН =====
function hideLoading() {
  loading.classList.add('hide');
  setTimeout(() => {
    loading.style.display = 'none';
    app.classList.remove('hidden');
  }, 500);
}

setTimeout(hideLoading, 1500);

// ===== КЛИК ПО ПЛАНЕТЕ =====
btn.addEventListener("click", (e) => {
  // +1
  count++;
  counterEl.textContent = count;

  // Эффект удара
  btn.classList.remove("hit");
  void btn.offsetWidth; // перезапуск анимации
  btn.classList.add("hit");

  // Вибрация (Telegram)
  if (tg?.HapticFeedback?.impactOccurred) {
    tg.HapticFeedback.impactOccurred("light");
  }

  // Эффекты
  createParticles(e.clientX, e.clientY);
  createPlusOne(e.clientX, e.clientY);
});

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

// ===== ВСПЛЫВАЮЩИЙ +1 =====
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
