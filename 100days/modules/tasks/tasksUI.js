/* =========================
   PASSWORD MODAL STATE
========================= */
let passwordMode = null;
let tempTaskName = null;
let deleteIndex = null;

/* =========================
   PASSWORD MODAL
========================= */
function openPasswordModal(mode, taskName = null, index = null) {
    passwordMode = mode;
    tempTaskName = taskName;
    deleteIndex = index;

    document.getElementById("passwordInput").value = "";

    document.getElementById("passwordTitle").innerText =
        mode === "create" ? "Set Password" : "Enter Password";

    document.getElementById("passwordModal").classList.add("show");
}

document.getElementById("closePassword").onclick = () => {
    tempTaskName = null;
    deleteIndex = null;
    document.getElementById("passwordModal").classList.remove("show");
};

document.getElementById("savePassword").onclick = () => {
    const value = document.getElementById("passwordInput").value.trim();

    if (!value || value.length < 3) {
        alert("Password must be at least 3 characters!");
        return;
    }

    if (passwordMode === "create") {
        tasks.push({
            text: tempTaskName,
            password: value,
            startDate: new Date().toISOString(),
            createdAt: new Date().toLocaleString()
        });

        if (!taskProgress[tempTaskName]) {
            taskProgress[tempTaskName] = new Array(100).fill(null).map(() => ({
                done: false,
                missed: false,
                note: ""
            }));
        }

        selectTask(tempTaskName);

        saveData();
        renderTasks();
        renderDays();
    }

    if (passwordMode === "delete") {
        const task = tasks[deleteIndex];

        if (value !== task.password && value !== MASTER_PASSWORD) {
            alert("Wrong password!");
            return;
        }

        delete taskProgress[task.text];
        tasks.splice(deleteIndex, 1);

        selectedTask = tasks.length ? tasks[0].text : null;

        saveData();
        renderTasks();
        renderDays();
    }

    document.getElementById("passwordModal").classList.remove("show");
};

/* =========================
   ADD TASK
========================= */
document.getElementById("taskForm").addEventListener("submit", e => {
    e.preventDefault();

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text || text.length < 2) return;

    if (tasks.some(t => t.text === text)) {
        alert("Task already exists!");
        return;
    }

    tempTaskName = text;
    input.value = "";

    openPasswordModal("create", text);
});

/* =========================
   TASK RENDER
========================= */
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.className = selectedTask === task.text ? "active-task" : "";
        li.onclick = () => selectTask(task.text);

        li.innerHTML = `
            <span>${task.text}</span>
            <span onclick="event.stopPropagation(); deleteTask(${i})">❌</span>
        `;

        list.appendChild(li);
    });
}

function selectTask(name) {
    selectedTask = name;
    localStorage.setItem("selectedTask", name);
    renderTasks();
    renderDays();
}

function deleteTask(i) {
    openPasswordModal("delete", null, i);
}
