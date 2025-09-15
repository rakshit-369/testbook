let subjects = ["English", "Static GK", "GK", "Hindi"];
let currentSubject = null;

// Hardcoded questions/answers
let data = {
  "English": [
    { "question": "What is a noun?", "answer": "A noun is a person, place, or thing." },
    { "question": "What is a verb?", "answer": "A verb is an action word." },
    { "question": "What is an adjective?", "answer": "An adjective describes a noun." }
  ],
  "Static GK": [
    { "question": "Capital of India?", "answer": "New Delhi" },
    { "question": "Largest planet?", "answer": "Jupiter" },
    { "question": "Chemical symbol of water?", "answer": "H2O" }
  ],
  "GK": [
    { "question": "Who is the current PM of India?", "answer": "Narendra Modi" },
    { "question": "World's tallest mountain?", "answer": "Mount Everest" },
    { "question": "Fastest land animal?", "answer": "Cheetah" }
  ],
  "Hindi": [
    { "question": "हिंदी में संज्ञा क्या है?", "answer": "संज्ञा व्यक्ति, स्थान या वस्तु को बताती है।" },
    { "question": "क्रिया क्या है?", "answer": "क्रिया कार्य को दर्शाती है।" },
    { "question": "विशेषण क्या है?", "answer": "विशेषण संज्ञा का वर्णन करता है।" }
  ]
};

// Show subjects page immediately
showScreen("subjects");

// Show/hide screens
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Open a subject page
function openSubject(sub) {
  currentSubject = sub;
  showScreen("subjectPage");

  // Navbar: show other subjects
  const otherSubjects = subjects.filter(s => s !== sub);
  const container = document.getElementById("otherSubjects");
  container.innerHTML = "";
  otherSubjects.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s;
    btn.onclick = () => openSubject(s);
    container.appendChild(btn);
  });

  // Add flip cards
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const questions = data[sub] || [];
  questions.forEach(q => {
    const card = document.createElement("div");
    card.className = "flip-card";

    const inner = document.createElement("div");
    inner.className = "flip-inner";

    const front = document.createElement("div");
    front.className = "flip-front";
    front.textContent = q.question;

    const back = document.createElement("div");
    back.className = "flip-back";
    back.textContent = q.answer;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Flip on click
    card.addEventListener("click", () => {
      inner.classList.toggle("flipped");
    });

    cardsContainer.appendChild(card);
  });
}

// Back to subjects page
function goBack() {
  showScreen("subjects");
}
