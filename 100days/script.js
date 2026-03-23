/* =========================
   LIBRARY
========================= */
function renderLibrary(list = taskLibrary) {
    const lib = document.getElementById("libraryList");
    lib.innerHTML = "";

    list.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>
            <span onclick="addFromLibrary('${task}')">➕</span>
        `;

        lib.appendChild(li);
    });
}

function addFromLibrary(task) {
    if (tasks.some(t => t.text === task)) {
        alert("Task already exists!");
        return;
    }

    tempTaskName = task;
    openPasswordModal("create", task);
}

/* =========================
   SEARCH
========================= */
document.getElementById("searchInput").addEventListener("keyup", function () {
    const val = this.value.toLowerCase();
    const filtered = taskLibrary.filter(t => t.toLowerCase().includes(val));
    renderLibrary(filtered);
});

/* =========================
   PROFILE NAVIGATION
========================= */
document.getElementById("profileBtn").onclick = () => {
    window.location.href = "profile/profile.html";
};

/* =========================
   INITIAL LOAD
========================= */
renderLibrary();
renderTasks();

if (!selectedTask && tasks.length > 0) {
    selectedTask = tasks[0].text;
}

if (selectedTask) renderDays();
