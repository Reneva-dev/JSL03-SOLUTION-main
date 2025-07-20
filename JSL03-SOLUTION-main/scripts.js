const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 1,
    title: "Conquer React⚛️",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 1,
    title: "Understand Databases⚙️",
    description: "Create a killer Resume",
    status: "todo",
  },
    {
    id: 1,
    title: "Crush Frameworks🖼️",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 2,
    title: "Never Give Up🏆",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Explore ES6 Features🚀",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 3,
    title: "Have fun🥳",
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

    modalTitleInput.value = task.title;
    modalDescription.value = task.description;
    modalStatus.value = task.status;
  } else {
    isEditing = false;
    currentTaskDiv = null;
    modalTitleInput.value = "";
    modalDescription.value = "";
    modalStatus.value = "todo";
  }

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  currentTaskDiv = null;
  isEditing = false;
}

function saveTask() {
  const title = modalTitleInput.value.trim();
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
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
if (saveTaskBtn) saveTaskBtn.addEventListener("click", saveTask);

const addTaskBtn = document.getElementById("addTaskBtn");
if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => openModal());
}

renderTasks();


