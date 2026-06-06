/* ═══════════════════════════════════════════════════
   MATHEW BALI - main.js
   Shared across all pages
   ═══════════════════════════════════════════════════ */

// ── THEME TOGGLE ──
(function () {
  const STORAGE_KEY = "mathewbali-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const track = document.getElementById("theme-toggle-track");
    const icon = document.getElementById("theme-toggle-icon");
    if (!track || !icon) return;
    if (theme === "light") {
      track.classList.add("is-light");
      icon.textContent = "☀️";
    } else {
      track.classList.remove("is-light");
      icon.textContent = "🌙";
    }
  }

  function toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Expose globally (called by onclick in HTML)
  window.toggleTheme = toggleTheme;

  // Init on load — respect saved preference, fallback to dark
  const saved = localStorage.getItem(STORAGE_KEY) || "dark";
  // Apply immediately to avoid flash
  document.documentElement.setAttribute("data-theme", saved);
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(saved);
  });
})();

// ── NAVBAR: Scroll effect ──
(function () {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
})();

// ── HAMBURGER MENU ──
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  if (!navLinks) return;
  navLinks.classList.toggle("open");
  // Animate hamburger bars
  if (hamburger) hamburger.classList.toggle("open");
}

function closeMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) navLinks.classList.remove("open");
  const hamburger = document.getElementById("hamburger");
  if (hamburger) hamburger.classList.remove("open");
}

// Close menu on outside click
document.addEventListener("click", function (e) {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  if (
    navLinks &&
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    hamburger &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

// ── SCROLL REVEAL ──
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  function initReveal() {
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal);
  } else {
    initReveal();
  }
})();

// ── FAQ ACCORDION ──
function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.classList.contains("open");
      // Close all
      faqItems.forEach((i) => {
        i.querySelector(".faq-question").classList.remove("open");
        i.querySelector(".faq-answer").classList.remove("open");
      });
      // Toggle current
      if (!isOpen) {
        btn.classList.add("open");
        answer.classList.add("open");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initFaq);

// ── ROBOT WIDGET TOGGLE ──
function toggleRobot() {
  const panel = document.getElementById("robot-panel");
  if (!panel) return;
  panel.classList.toggle("open");
  const icon = document.getElementById("robot-toggle-icon");
  if (icon) icon.textContent = panel.classList.contains("open") ? "✕" : "🤖";
}

// ── CURSOR GLOW ──
(function () {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
})();

// ── AMBIENT FLOATING DOTS ──
(function () {
  const count = 8;
  const colors = ["var(--gold)", "var(--motor-primary)", "var(--tour-primary)"];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "ambient-dot";
    dot.style.setProperty("--dur", 5 + Math.random() * 7 + "s");
    dot.style.setProperty("--dly", "-" + Math.random() * 8 + "s");
    dot.style.left = 5 + Math.random() * 90 + "%";
    dot.style.top = 5 + Math.random() * 90 + "%";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(dot);
  }
})();
