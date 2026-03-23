/* =========================
   LOAD DATA
========================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskProgress = JSON.parse(localStorage.getItem("taskProgress")) || {};
let currentUser = localStorage.getItem("currentUser") || "User";

/* =========================
   BACK BUTTON
========================= */

document.getElementById("backBtn").onclick = () => {
    window.location.href = "../index.html";
};

/* =========================
   PROCESS DATA
========================= */

let ongoing = [];
let completed = [];
let notStarted = [];

let totalDaysDone = 0;

// Loop through all tasks
tasks.forEach(task => {
    let days = taskProgress[task.text] || [];

    let done = days.filter(d => d.done).length;

    totalDaysDone += done;

    if (done === 100) {
        completed.push(task.text);
    } else if (done > 0) {
        ongoing.push(task.text);
    } else {
        notStarted.push(task.text);
    }
});

/* =========================
   CURRENT TASK
========================= */

let selectedTask = localStorage.getItem("selectedTask");

if (!selectedTask && tasks.length) {
    selectedTask = tasks[0].text;
}


let currentDone = 0;
let streak = 0;

if (selectedTask) {
    let currentDays = taskProgress[selectedTask] || [];

    currentDone = currentDays.filter(d => d.done).length;

    // streak
    for (let i = 0; i < currentDays.length; i++) {
        if (currentDays[i].done) streak++;
        else break;
    }
}

/* =========================
   CONSISTENCY
========================= */

let totalPossibleDays = tasks.length * 100;
let consistency = totalPossibleDays
    ? Math.floor((totalDaysDone / totalPossibleDays) * 100)
    : 0;

/* =========================
   RENDER DATA
========================= */

// User info
document.getElementById("username").innerText = currentUser;
document.getElementById("totalTasks").innerText = tasks.length;
document.getElementById("completedTasks").innerText = completed.length;

// Current task
document.getElementById("currentTask").innerText = selectedTask || "-";
document.getElementById("currentProgress").innerText = `${currentDone}/100`;
document.getElementById("currentStreak").innerText = streak;

// Stats
document.getElementById("totalDaysDone").innerText = totalDaysDone;
document.getElementById("consistency").innerText = `${consistency}%`;

/* =========================
   RENDER LISTS
========================= */

function renderList(id, list) {
    const ul = document.getElementById(id);
    ul.innerHTML = "";

    if (list.length === 0) {
        ul.innerHTML = "<li>No tasks</li>";
        return;
    }

    list.forEach(task => {
        const li = document.createElement("li");
        li.innerText = task;

li.style.cursor = "pointer";

li.onclick = () => {
    localStorage.setItem("selectedTask", task);
    window.location.href = "../index.html";
};

        ul.appendChild(li);
    });
}

renderList("ongoingList", ongoing);
renderList("completedList", completed);
renderList("notStartedList", notStarted);
