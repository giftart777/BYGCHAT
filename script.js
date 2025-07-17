const affirmations = [
  "I AM not what broke me — I AM who I became after it.",
  "I AM designed for divine timing, not the world’s pressure.",
  "I AM writing my story one brave word at a time.",
  "I AM healing loudly, growing quietly.",
  "I AM learning to be more than I’ve seen."
];

let index = 0;

function showAffirmation() {
  const text = document.getElementById("affirmationText");
  text.innerText = affirmations[index];
  index = (index + 1) % affirmations.length;
}

// Show the first affirmation
showAffirmation();

function saveEntry() {
  const entry = document.getElementById('journalEntry').value;
  if (entry.trim()) {
    localStorage.setItem('journal_' + new Date().toISOString(), entry);
    document.getElementById('savedMessage').innerText = "Saved at " + new Date().toLocaleTimeString();
    document.getElementById('journalEntry').value = "";
  }
}
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('currentTime').textContent = "🕰️ " + time;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call
document.getElementById('shareBtn').addEventListener('click', async () => {
  const appUrl = window.location.href; // or your custom URL like: "https://911mybecoming.netlify.app"

  if (navigator.share) {
    try {
      await navigator.share({
        title: '9:11 — My Becoming',
        text: 'Start your daily journey with affirmations and reflection. 🌱',
        url: appUrl
      });
    } catch (error) {
      console.log('Sharing failed:', error);
    }
  } else {
    // Fallback for browsers that do not support navigator.share
    try {
      await navigator.clipboard.writeText(appUrl);
      alert('🔗 App link copied to clipboard!');
    } catch (error) {
      alert('Copy failed. Please copy manually.');
    }
  }
});