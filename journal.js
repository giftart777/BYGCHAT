document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("passcode-form");
  const input = document.getElementById("passcode-input");
  const message = document.getElementById("message");
  const journalSection = document.getElementById("journal-section");
  const textarea = document.querySelector("textarea");
  const saveBtn = document.querySelector(".save-note");
  const clearBtn = document.querySelector(".clear-note");
  const downloadBtn = document.querySelector(".download-note");
  const timestamp = document.getElementById("timestamp");
  const quote = document.getElementById("daily-quote");

  const correctPasscode = "becoming911";

  // Quotes to display
  const quotes = [
    "You are becoming all you were created to be.",
    "Silence speaks when the soul is listening.",
    "Every page you write is healing.",
    "Your truth is your superpower.",
    "Breathe. Reflect. Begin again.",
    "Even in stillness, you grow.",
    "You are the author of your peace.",
    "Write it until it sets you free."
  ];

  // Pick a random quote each time
  quote.textContent = "🌙 " + quotes[Math.floor(Math.random() * quotes.length)];

  // Load saved note and timestamp
  if (localStorage.getItem("journalNote")) {
    textarea.value = localStorage.getItem("journalNote");
  }

  if (localStorage.getItem("journalTimestamp")) {
    timestamp.textContent = "Last saved: " + localStorage.getItem("journalTimestamp");
  }

  // Unlock journal
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const enteredPasscode = input.value;

    if (enteredPasscode === correctPasscode) {
      document.getElementById("lock-screen").style.display = "none";
      journalSection.style.display = "block";
    } else {
      message.textContent = "❌ Incorrect passcode";
      message.style.color = "red";
    }
  });

  // Save
  saveBtn.addEventListener("click", () => {
    const content = textarea.value;
    const now = new Date().toLocaleString();
    localStorage.setItem("journalNote", content);
    localStorage.setItem("journalTimestamp", now);
    timestamp.textContent = "Last saved: " + now;
    alert("✅ Journal saved.");
  });

  // Clear
  clearBtn.addEventListener("click", () => {
    const confirmClear = confirm("Are you sure you want to clear your note?");
    if (confirmClear) {
      textarea.value = "";
      localStorage.removeItem("journalNote");
      timestamp.textContent = "";
      alert("🗑️ Journal cleared.");
    }
  });

  // Download
  downloadBtn.addEventListener("click", () => {
    const content = textarea.value;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my_journal_entry.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});