import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCx6MkARH9RodpJoJmttkdfgEUDMe4w6-o",
    authDomain: "comments-e09d8.firebaseapp.com",
    projectId: "comments-e09d8",
    storageBucket: "comments-e09d8.firebasestorage.app",
    messagingSenderId: "963478072300",
    appId: "1:963478072300:web:7fecaef541e05005d86ec9",
    measurementId: "G-JPJW8H4LFB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const commentsRef = collection(db, "comments");

const nameInput = document.getElementById("nameInput");
const commentInput = document.getElementById("commentInput");
const postBtn = document.getElementById("postBtn");
const commentsList = document.getElementById("comments");

postBtn.addEventListener("click", async () => {

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();

    if (!name || !text) {
        alert("Please enter both your name and your comment.");
        return;
    }

    await addDoc(commentsRef, {
        name: name,
        text: text,
        timestamp: Date.now()
    });

    nameInput.value = "";
    commentInput.value = "";
});

onSnapshot(commentsRef, (snapshot) => {

    commentsList.innerHTML = "";

    snapshot.forEach((commentDoc) => {

        const data = commentDoc.data();

        const li = document.createElement("li");

        // Public only sees the comment text
        li.innerHTML = `
            <p>${data.text}</p>

            <button class="editBtn">
                Edit
            </button>

            <button class="deleteBtn">
                Delete
            </button>
        `;

        const editBtn = li.querySelector(".editBtn");
        const deleteBtn = li.querySelector(".deleteBtn");

        editBtn.addEventListener("click", async () => {

            const newText = prompt(
                "Edit archived testimony:",
                data.text
            );

            if (!newText) return;

            await updateDoc(
                doc(db, "comments", commentDoc.id),
                {
                    text: newText
                }
            );
        });

        deleteBtn.addEventListener("click", async () => {

            const confirmed = confirm(
                "Remove this testimony from the archive?"
            );

            if (!confirmed) return;

            await deleteDoc(
                doc(db, "comments", commentDoc.id)
            );
        });

        commentsList.appendChild(li);
    });
    const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    music.play();
    musicBtn.style.display = "none";
});
});