const tasks = [
  { title: "Finish authentication API", meta: "Due tomorrow · 45 min", priority: "High", type: "high" },
  { title: "Prepare DBMS assignment", meta: "Due today · 60 min", priority: "High", type: "high" },
  { title: "Review presentation slides", meta: "Due tomorrow · 30 min", priority: "Medium", type: "medium" },
  { title: "Reply to project messages", meta: "No deadline · 15 min", priority: "Low", type: "low" }
];

const taskList = document.querySelector("#task-list");
const toast = document.querySelector("#toast");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");

function renderTasks() {
  taskList.innerHTML = tasks.map((task, index) => `
    <div class="task-row">
      <button class="check" data-task="${index}" aria-label="Complete ${task.title}"></button>
      <div class="task-copy"><strong>${task.title}</strong><small>${task.meta}</small></div>
      <span class="task-priority ${task.type}">${task.priority}</span>
    </div>`).join("");
  document.querySelectorAll(".check").forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("done");
    button.textContent = button.classList.contains("done") ? "✓" : "";
    showToast(button.classList.contains("done") ? "Task completed — nice work!" : "Task reopened");
  }));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function openModal(title, body) {
  modalContent.innerHTML = `<h2>${title}</h2>${body}`;
  modal.classList.add("open");
}

renderTasks();
document.querySelector("#close-modal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", event => { if (event.target === modal) modal.classList.remove("open"); });
document.querySelector("#why-button").addEventListener("click", () => openModal("Why this task?", "<p>Smart Task selected <strong>Finish authentication API</strong> because it has the highest combined impact right now.</p><ul><li>Deadline is within 24 hours</li><li>It blocks 2 other tasks</li><li>It fits your current 45-minute focus window</li><li>Your available capacity is still healthy</li></ul>"));
document.querySelector("#start-focus").addEventListener("click", () => openModal("Focus session ready", "<p>Your 45-minute focus block is ready. Put your phone on silent, close distractions, and make progress on the authentication API.</p><button class=\"focus-button\" id=\"begin-timer\">Begin focus session →</button>"));
document.querySelector("#fix-plan").addEventListener("click", () => openModal("Your plan is healthy", "<p>You have <strong>1 hour 10 minutes</strong> of buffer today. Smart Task recommends using 20 minutes of it to start the presentation slides.</p><button class=\"focus-button\" id=\"accept-plan\">Add recommendation →</button>"));
document.querySelector("#new-task").addEventListener("click", () => openModal("Add a smart task", "<p>Describe what you need to do and Smart Task will estimate urgency, effort, and the best time to complete it.</p><input id=\"task-input\" placeholder=\"e.g. Submit project report by Monday\" style=\"width:100%;padding:12px;border:1px solid #dfe3eb;border-radius:7px;font:inherit;font-size:12px\"><button class=\"focus-button\" id=\"add-task\" style=\"margin-top:12px\">Analyze task →</button>"));
document.addEventListener("click", event => {
  if (event.target.id === "begin-timer") { modal.classList.remove("open"); showToast("Focus mode started — 45:00"); }
  if (event.target.id === "accept-plan") { modal.classList.remove("open"); showToast("Recommendation added to your schedule"); }
  if (event.target.id === "add-task") { const input = document.querySelector("#task-input"); if (input && input.value.trim()) { modal.classList.remove("open"); showToast("Task analyzed and added to AI Inbox"); } }
});

document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => {
  const view = button.dataset.view;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  document.querySelector("#view-title").textContent = view[0].toUpperCase() + view.slice(1);
  if (view !== "today") showToast(`${view[0].toUpperCase() + view.slice(1)} view is ready for the next build phase`);
}));
document.querySelector(".mobile-menu").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
