let subjects = ["English", "Static GK", "GK", "Hindi"];
let currentSubject = null;
let data = {}; // Will hold JSON questions

// Fetch JSON from public folder
fetch("/questions.json")
  .then((res) => {
    if (!res.ok) throw new Error("Failed to load questions.json");
    return res.json();
  })
  .then((json) => {
    data = json;
    console.log("JSON loaded:", data);

    // Start greeting → subjects flow after JSON is ready
    setTimeout(() => showScreen("subjects"), 10000);
  })
  .catch((err) => {
    console.error("Error loading JSON:", err);
    alert("Failed to load questions. Please check questions.json.");
  });

// Show/hide screens
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Open a subject page
function openSubject(sub) {
  currentSubject = sub;
  showScreen("subjectPage");

  // Navbar: show other subjects
  const otherSubjects = subjects.filter((s) => s !== sub);
  const container = document.getElementById("otherSubjects");
  container.innerHTML = "";
  otherSubjects.forEach((s) => {
    const btn = document.createElement("button");
    btn.textContent = s;
    btn.onclick = () => openSubject(s);
    container.appendChild(btn);
  });

  // Add flip cards
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  const questions = data[sub] || [];
  questions.forEach((q) => {
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
