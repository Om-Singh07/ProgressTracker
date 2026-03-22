/* =========================
   PROGRESS DATA
========================= */
let taskProgress = JSON.parse(localStorage.getItem("taskProgress")) || {};

/* =========================
   SAVE DATA
========================= */
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskProgress", JSON.stringify(taskProgress));
}

/* =========================
   MARK DAY
========================= */
function markDay(index) {
    const days = taskProgress[selectedTask];

    if (days[index].done) return;

    days[index].done = true;

    saveData();
    renderDays();
}

/* =========================
   PROGRESS UPDATE
========================= */
function updateProgress() {
    const days = taskProgress[selectedTask];
    const done = days.filter(d => d.done).length;

    const percent = Math.floor((done / 100) * 100);

    let streak = 0;
    for (let i = 0; i < days.length; i++) {
        if (days[i].done) streak++;
        else break;
    }

    document.getElementById("progressText").innerText =
        `${done} / 100 days (${percent}%) | 🔥 Streak: ${streak}`;
}
