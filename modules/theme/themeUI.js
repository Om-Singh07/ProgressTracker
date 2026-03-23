import { setTheme, getTheme } from "./theme.js";

const btn = document.getElementById("themeToggle");

// Load saved theme
function initTheme() {
    const savedTheme = getTheme();
    setTheme(savedTheme);
    updateIcon(savedTheme);
}

// Toggle theme
btn.addEventListener("click", () => {
    const current = getTheme();
    const newTheme = current === "light" ? "dark" : "light";

    setTheme(newTheme);
    updateIcon(newTheme);
});

// Change button icon
function updateIcon(mode) {
    btn.textContent = mode === "dark" ? "☀️" : "🌙";
}

initTheme();
