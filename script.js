let subjects = ["English", "Static GK", "GK", "Hindi"];
let currentSubject = null;
let data = {}; // JSON data

// Load JSON data
fetch("/questions.json")
  .then(res => res.json())
  .then(json => {
    data = json;
  })
  .catch(err => console.error("Error loading JSON:", err));

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Auto switch greeting -> subjects
setTimeout(() => showScreen("subjects"), 1000);

function openSubject(sub) {
  currentSubject = sub;
  showScreen("subjectPage");

  // Navbar buttons
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

    card.addEventListener("click", () => {
      inner.classList.toggle("flipped");
    });

    cardsContainer.appendChild(card);
  });
}

function goBack() {
  showScreen("subjects");
}
