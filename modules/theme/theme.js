const THEME_KEY = "theme";

export function setTheme(mode) {
    document.body.classList.toggle("dark-mode", mode === "dark");
    localStorage.setItem(THEME_KEY, mode);
}

export function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}
