/* =========================
   MASTER PASSWORD
========================= */
const MASTER_PASSWORD = "MyMaster123";

/* =========================
   DATE HELPER
========================= */
function getTodayIndex(startDate) {
    const start = new Date(startDate);
    const today = new Date();

    return Math.floor((today - start) / (1000 * 60 * 60 * 24));
}

/* =========================
   DATA
========================= */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Convert old tasks
tasks = tasks.map(t => {
    if (typeof t === "string") {
        return {
            text: t,
            password: "",
            startDate: new Date().toISOString(),
            createdAt: new Date().toLocaleString()
        };
    }
    if (!t.startDate) {
        t.startDate = new Date().toISOString();
    }
    if (!t.createdAt) {
        t.createdAt = new Date().toLocaleString();
    }
    return t;
});

localStorage.setItem("tasks", JSON.stringify(tasks));

let selectedTask = localStorage.getItem("selectedTask") || null;

/* =========================
   TASK LIBRARY
========================= */
let taskLibrary = [
    "Study Math",
    "Workout",
    "Current Affairs",
    "Revision",
    "Mock Test"
];
