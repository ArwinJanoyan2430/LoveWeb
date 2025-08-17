// Show current date
const currentDateEl = document.getElementById("current-date");
const today = new Date();
currentDateEl.textContent = today.toDateString();

// Countdown to next anniversary
const nextEventEl = document.getElementById("next-event");
const countdownEl = document.getElementById("current-countdown");

function updateCountdown() {
  const today = new Date();
  const anniversary = new Date("April 14, 2026 00:00:00");
  const diff = anniversary - today;

  if (diff <= 0) {
    countdownEl.textContent = "🎉 It's your Anniversary today!";
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();


    // Additional functionality for Date Planner, Schedule, etc. will go here
const form = document.getElementById("planner-form");
const plannerOutput = document.getElementById("planner-output");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const date = document.getElementById("date").value;
  const question = document.getElementById("question").value;

  if (date && question) {
    plannerOutput.style.display = "block";

    const entry = document.createElement("div");
    entry.classList.add("entry");
    entry.innerHTML = `<strong>${date}</strong>: ${question} 
      <button class="delete-btn">✖</button>`;

    entry.querySelector(".delete-btn").addEventListener("click", () => {
      entry.remove();
      if (plannerOutput.children.length === 0) {
        plannerOutput.style.display = "none";
      }
    });

    plannerOutput.appendChild(entry);
    form.reset();
  }
});
function addSchedule() {
  const date = document.getElementById("event-date").value;
  const name = document.getElementById("event-name").value;
  const notes = document.getElementById("event-notes").value;

  if (date && name) {
    const table = document.getElementById("schedule-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${date}</td>
      <td>${name}</td>
      <td>${notes || "-"}</td>
      <td>
        <button onclick="editSchedule(this)">✏️</button>
        <button onclick="deleteSchedule(this)">🗑️</button>
      </td>
    `;

    table.appendChild(row);

    document.getElementById("event-date").value = "";
    document.getElementById("event-name").value = "";
    document.getElementById("event-notes").value = "";
  } else {
    alert("Please enter at least a date and event name.");
  }
}

function editSchedule(btn) {
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");

  // Turn cells into input fields
  const date = cells[0].innerText;
  const event = cells[1].innerText;
  const notes = cells[2].innerText;

  cells[0].innerHTML = `<input type="date" value="${date}">`;
  cells[1].innerHTML = `<input type="text" value="${event}">`;
  cells[2].innerHTML = `<input type="text" value="${notes}">`;

  btn.textContent = "💾";
  btn.onclick = function () {
    saveSchedule(btn);
  };
}

function saveSchedule(btn) {
  const row = btn.closest("tr");
  const inputs = row.querySelectorAll("input");

  row.cells[0].innerText = inputs[0].value;
  row.cells[1].innerText = inputs[1].value;
  row.cells[2].innerText = inputs[2].value;

  btn.textContent = "✏️";
  btn.onclick = function () {
    editSchedule(btn);
  };
}

function deleteSchedule(btn) {
  btn.closest("tr").remove();
}

function addTask() {
  const taskInput = document.getElementById("todo-task");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;
  span.onclick = () => li.classList.toggle("completed");

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(delBtn);

  document.getElementById("todo-list").appendChild(li);

  taskInput.value = "";
}

function addNote() {
  const noteText = document.getElementById("note-text").value;
  if (noteText.trim() === "") return;

  const notesList = document.getElementById("notes-list");
  const noteCard = document.createElement("div");
  noteCard.className = "note-card";
  noteCard.innerHTML = `
    <p>${noteText}</p>
    <button onclick="this.parentElement.remove()">✖</button>
  `;

  notesList.appendChild(noteCard);
  document.getElementById("note-text").value = "";
}
function addGoal() {
  const goalText = document.getElementById("goal-text").value;
  if (goalText.trim() === "") return;

  const goalsList = document.getElementById("goals-list");
  const goalItem = document.createElement("div");
  goalItem.className = "goal-item";
  goalItem.innerHTML = `
    <input type="checkbox" onchange="toggleGoal(this)">
    <p>${goalText}</p>
    <button onclick="this.parentElement.remove()">✖</button>
  `;

  goalsList.appendChild(goalItem);
  document.getElementById("goal-text").value = "";
}

function toggleGoal(checkbox) {
  const text = checkbox.nextElementSibling;
  if (checkbox.checked) {
    text.style.textDecoration = "line-through";
    text.style.color = "gray";
  } else {
    text.style.textDecoration = "none";
    text.style.color = "black";
  }
}

function addCurrentSong() {
  const input = document.getElementById("current-song");
  const song = input.value.trim();
  if (song === "") return;

  const list = document.getElementById("song-list");
  const li = document.createElement("li");
  li.innerHTML = `${song} <button onclick="this.parentElement.remove()">✖</button>`;
  list.appendChild(li);

  input.value = "";
}
