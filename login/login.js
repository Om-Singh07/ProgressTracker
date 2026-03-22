const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

// REGISTER
document.getElementById("registerBtn").onclick = () => {
    const user = username.value.trim();
    const pass = password.value.trim();

    if (!user || !pass) {
        message.innerText = "Fill all fields";
        return;
    }

    if (localStorage.getItem("user_" + user)) {
        message.innerText = "User already exists!";
        return;
    }

    localStorage.setItem("user_" + user, pass);
    message.style.color = "green";
    message.innerText = "Registered! Now login.";
};

// LOGIN
document.getElementById("loginBtn").onclick = () => {
    const user = username.value.trim();
    const pass = password.value.trim();

    const stored = localStorage.getItem("user_" + user);

    if (!stored || stored !== pass) {
        message.style.color = "red";
        message.innerText = "Wrong credentials!";
        return;
    }

    localStorage.setItem("currentUser", user);

    // 🔥 go back to main app
    window.location.href = "../index.html";
};
