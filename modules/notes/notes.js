/* =========================
   NOTES
========================= */
let currentDayIndex = null;

function openNoteEditor(index) {
    currentDayIndex = index;
    const day = taskProgress[selectedTask][index];

    document.getElementById("noteTitle").innerText = `Day ${index + 1} Note`;
    document.getElementById("noteInput").value = day.note || "";

    document.getElementById("noteModal").classList.add("show");
}

document.getElementById("saveNote").onclick = () => {
    if (currentDayIndex !== null) {
        taskProgress[selectedTask][currentDayIndex].note =
            document.getElementById("noteInput").value.trim();

        saveData();
        renderDays();
    }
    closeNoteEditor();
};

document.getElementById("closeNote").onclick = closeNoteEditor;

function closeNoteEditor() {
    document.getElementById("noteModal").classList.remove("show");
    currentDayIndex = null;
}
