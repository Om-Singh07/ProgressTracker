/* =========================
   DAYS UI
========================= */
function renderDays() {
    const container = document.getElementById("daysContainer");
    container.innerHTML = "";

    if (!selectedTask) {
        document.getElementById("progressText").innerText = "0 / 100 days";
        document.getElementById("currentTask").innerText = "";
        return;
    }

    const days = taskProgress[selectedTask];
    const current = tasks.find(t => t.text === selectedTask);

    const todayIndex = getTodayIndex(current.startDate);

    // ✅ Show task + password
    const currentTaskEl = document.getElementById("currentTask");
    currentTaskEl.innerHTML = `${selectedTask} [${current.password}]`;

    // ✅ Show created time
    const createdInfo = document.createElement("div");
    createdInfo.style.fontSize = "14px";
    createdInfo.style.marginTop = "5px";
    createdInfo.innerText = "Created: " + current.createdAt;

    currentTaskEl.appendChild(createdInfo);

    days.forEach((day, i) => {
        const div = document.createElement("div");

        // 🔴 Missed logic
        if (i < todayIndex && !day.done) {
            day.missed = true;
        }

        // 🔒 Lock logic (only today allowed)
        let isLocked = i !== todayIndex;

        div.className = "day";

        if (day.done) div.classList.add("completed");
        if (day.missed) div.classList.add("missed");
        if (isLocked) div.classList.add("locked");

        div.innerText = i + 1;

        if (day.note) div.title = day.note;

        div.onclick = () => {
            if (!isLocked) markDay(i);
        };

        div.ondblclick = () => openNoteEditor(i);

        container.appendChild(div);
    });

    saveData();
    updateProgress();
}
