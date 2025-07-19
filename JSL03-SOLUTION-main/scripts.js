const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Contribute to Open Source Projects",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
];

let isEditing = false;


// Get modal elements with correct IDs
const modal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitleInput = document.getElementById("modalTaskTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const saveTaskBtn = document.getElementById("saveTask");

let currentTaskDiv = null;

function renderTasks() {
  // Clear all task containers first
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });

  // Loop over initialTasks and create a task div for each
  initialTasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-div");
    taskDiv.textContent = task.title;

    // Store the task ID on the element for reference
    taskDiv.dataset.taskId = task.id;

    // Add click listener to open modal for this task
    taskDiv.addEventListener("click", () => openModal(taskDiv));

    // Append to the correct column based on task.status
    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`
    );
    if (column) {
      column.appendChild(taskDiv);
    }
  });

  updateColumnCounts();
}

function updateColumnCounts() {
  const statuses = ["todo", "doing", "done"];
  statuses.forEach((status) => {
    const count = initialTasks.filter((task) => task.status === status).length;
    const header = document.querySelector(
      `.column-div[data-status="${status}"] .columnHeader`
    );
    if (header) {
      header.textContent = `${status.toUpperCase()} (${count})`;
    }
  });
}

function openModal(taskDiv = null) {
  if (taskDiv) {
    isEditing = true;
    currentTaskDiv = taskDiv;

    const taskId = parseInt(taskDiv.dataset.taskId);
    const task = initialTasks.find((t) => t.id === taskId);

    if (!task) return;

    modalTitle.value = task.title;
    modalDescription.value = task.description;
    modalStatus.value = task.status;
  } else {
    isEditing = false;
    currentTaskDiv = null;
    modalTitle.value = "";
    modalDescription.value = "";
    modalStatus.value = "todo";
  }

  modal.style.display = "flex";
}

function saveTask() {
  const title = modalTitle.value.trim();
  const description = modalDescription.value.trim();
  const status = modalStatus.value;

  if (!title || !description || !status) return;

  if (isEditing && currentTaskDiv) {
    const taskId = parseInt(currentTaskDiv.dataset.taskId);
    const task = initialTasks.find((t) => t.id === taskId);
    if (!task) return;

    task.title = title;
    task.description = description;
    task.status = status;
  } else {
    const newTask = {
      id: initialTasks.length + 1,
      title,
      description,
      status,
    };
    initialTasks.push(newTask);
  }

  renderTasks();
  closeModal();
}


// Events
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
saveTaskBtn.addEventListener("click", saveTask);

renderTasks();
