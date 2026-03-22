/* =========================
   LOGIN CHECK
========================= */
if (!localStorage.getItem("currentUser")) {
    window.location.href = "login/login.html";
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login/login.html";
}

document.getElementById("logoutBtn").onclick = logout;

/* =========================
   AUTO LOGOUT
========================= */
let logoutTimer;
const AUTO_LOGOUT_TIME = 10 * 60 * 1000;

function resetTimer() {
    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
        alert("Session expired! Logging out...");
        logout();
    }, AUTO_LOGOUT_TIME);
}

["click", "mousemove", "keypress", "scroll"].forEach(event => {
    document.addEventListener(event, resetTimer);
});

resetTimer();
