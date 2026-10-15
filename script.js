(function () {
  "use strict";

  // Build the keyboard visual
  const board = document.getElementById("board");
  if (board) {
    // A 75% layout simplified: 4 rows + a number row, Esc excluded for simplicity
    const rows = [
      [
        "esc",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "bksp",
      ],
      ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
      ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
    ];
    const wide = new Set(["bksp", "tab", "caps", "shift", "enter"]);
    rows.forEach((row) => {
      row.forEach((k) => {
        const key = document.createElement("div");
        key.className = "key" + (wide.has(k) ? " wide" : "");
        board.appendChild(key);
      });
    });
    // light up a few random keys to animate
    const keys = board.querySelectorAll(".key");
    let i = 0;
    setInterval(() => {
      keys.forEach((k) => k.classList.remove("lit"));
      const pick = Math.floor(Math.random() * keys.length);
      keys[pick].classList.add("lit");
      if (i++ % 5 === 0) {
        const pick2 = Math.floor(Math.random() * keys.length);
        keys[pick2].classList.add("lit");
      }
    }, 320);
  }

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }),
    );
  }

  // Sticky nav shadow
  const nav = document.getElementById("nav");
  window.addEventListener(
    "scroll",
    () => {
      if (!nav) return;
      if (window.scrollY > 10)
        nav.style.boxShadow = "0 8px 30px -20px rgba(0,0,0,0.6)";
      else nav.style.boxShadow = "none";
    },
    { passive: true },
  );

  // Reveal on scroll
  const revealEls = document.querySelectorAll(
    ".section-head, .card, .spec, .color-card, .review, .buy-card",
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Buy form
  const form = document.getElementById("buyForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.textContent = "Reserved ✓";
        btn.disabled = true;
      }
      const note = document.createElement("p");
      note.className = "buy-fine";
      note.style.color = "var(--accent-2)";
      note.textContent =
        "Thanks! Check your inbox to confirm your reservation.";
      form.appendChild(note);
    });
  }
})();
