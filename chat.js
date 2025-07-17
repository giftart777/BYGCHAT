const firebaseConfig = {
  ,
  authDomain: "mybecomingchat.firebaseapp.com",
  databaseURL: "https://mybecomingchat-default-rtdb.firebaseio.com/",
  projectId: "mybecomingchat",
  storageBucket: "mybecomingchat.appspot.com",
  messagingSenderId: "656724382271",
  appId: "1:656724382271:web:c31cf0b14bab219b2a9e8a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function sendMessage() {
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;
  if (username && message) {
    db.ref("messages").push({ username, message });
    document.getElementById('message').value = '';
  }
}

db.ref("messages").on("child_added", function(snapshot) {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `🗨️ ${msg.username}: ${msg.message}`;
  document.getElementById("messages").appendChild(msgDiv);
});
document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;