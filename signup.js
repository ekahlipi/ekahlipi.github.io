alert("signup.js is running");

import { auth, database } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { ref, set } from
  "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const password = document.getElementById("userPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    await set(ref(database, "users/" + user.uid + "/profile"), {
      name: name,
      email: email,
      createdAt: Date.now()
    });

    alert("Signup successful!");
    window.location.href = "index.html";

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});
