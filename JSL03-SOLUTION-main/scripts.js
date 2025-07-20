// =====================
// Module: Data & State
// =====================

/**
 * Initial set of predefined tasks.
 * @type {Array<{id: number, title: string, description: string, status: string}>}
 */
const initialTasks = [
  { id: 1, title: "Launch Epic Career🚀", description: "Create a killer Resume", status: "todo" },
  { id: 2, title: "Conquer React⚛️", description: "Create a killer Resume", status: "todo" },
  { id: 3, title: "Understand Databases⚙️", description: "Create a killer Resume", status: "todo" },
  { id: 4, title: "Crush Frameworks🖼️", description: "Create a killer Resume", status: "todo" },
  { id: 5, title: "Master JavaScript💛", description: "Get comfortable with the fundamentals", status: "doing" },
  { id: 6, title: "Never Give Up🏆", description: "Get comfortable with the fundamentals", status: "doing" },
  { id: 7, title: "Explore ES6 Features🚀", description: "Gain practical experience and collaborate with others", status: "done" },
  { id: 8, title: "Have fun🥳", description: "Gain practical experience and collaborate with others", status: "done" },
];

let isEditing = false;
let currentTaskDiv = null;

// =====================
// Module: DOM Elements
// =====================

const modal = document.getElementById("taskModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitleInput = document.getElementById("modalTaskTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const saveTaskBtn = document.getElementById("saveTask");
const addTaskBtn = document.getElementById("addTaskBtn");

// =====================
// Module: Rendering
// =====================

/**
 * Renders all tasks to their respective columns.
 */
function renderTasks() {
  clearTaskContainers();
  initialTasks.forEach(renderTaskToColumn);
  updateColumnCounts();
}

/**
 * Clears all task containers.
 */
function clearTaskContainers() {
  document.querySelectorAll(".tasks-container").forEach(container => {
    container.innerHTML = "";
  });
}

/**
 * Renders a single task element to the correct column.
 * @param {{id: number, title: string, status: string}} task
 */
function renderTaskToColumn(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;
  taskDiv.addEventListener("click", () => openModal(taskDiv));

  const column = document.querySelector(`.column-div[data-status="${task.status}"] .tasks-container`);
  if (column) column.appendChild(taskDiv);
}

/**
 * Updates the task counts in each column header.
 */
function updateColumnCounts() {
  ["todo", "doing", "done"].forEach(status => {
    const count = initialTasks.filter(task => task.status === status).length;
    const header = document.querySelector(`.column-div[data-status="${status}"] .columnHeader`);
    if (header) header.textContent = `${status.toUpperCase()} (${count})`;
  });
}

// =====================
// Module: Modal Handling
// =====================

/**
 * Opens the modal for editing or creating a task.
 * @param {HTMLElement|null} taskDiv
 */
function openModal(taskDiv = null) {
  if (taskDiv) {
    isEditing = true;
    currentTaskDiv = taskDiv;
    populateModalFields(taskDiv);
  } else {
    isEditing = false;
    currentTaskDiv = null;
    resetModalFields();
  }

  modal.style.display = "flex";
}

/**
 * Closes the modal and resets state.
 */
function closeModal() {
  modal.style.display = "none";
  currentTaskDiv = null;
  isEditing = false;
}

/**
 * Populates modal fields from a task div.
 * @param {HTMLElement} taskDiv
 */
function populateModalFields(taskDiv) {
  const taskId = parseInt(taskDiv.dataset.taskId);
  const task = initialTasks.find(t => t.id === taskId);
  if (!task) return;

  modalTitleInput.value = task.title;
  modalDescription.value = task.description;
  modalStatus.value = task.status;
}

/**
 * Resets modal input fields for creating a new task.
 */
function resetModalFields() {
  modalTitleInput.value = "";
  modalDescription.value = "";
  modalStatus.value = "todo";
}

// =====================
// Module: Task Saving
// =====================

/**
 * Saves the task from the modal, either updating or creating.
 */
function saveTask() {
  const title = modalTitleInput.value.trim();
  const description = modalDescription.value.trim();
  const status = modalStatus.value;

  if (!title || !description || !status) return;

  if (isEditing && currentTaskDiv) {
    updateTask(currentTaskDiv, title, description, status);
  } else {
    createTask(title, description, status);
  }

  renderTasks();
  closeModal();
}

/**
 * Updates an existing task.
 * @param {HTMLElement} taskDiv
 * @param {string} title
 * @param {string} description
 * @param {string} status
 */
function updateTask(taskDiv, title, description, status) {
  const taskId = parseInt(taskDiv.dataset.taskId);
  const task = initialTasks.find(t => t.id === taskId);
  if (!task) return;

  task.title = title;
  task.description = description;
  task.status = status;
}

/**
 * Creates and adds a new task to the list.
 * @param {string} title
 * @param {string} description
 * @param {string} status
 */
function createTask(title, description, status) {
  const newTask = {
    id: initialTasks.length + 1,
    title,
    description,
    status,
  };
  initialTasks.push(newTask);
}

// =====================
// Module: Event Listeners
// =====================

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
if (saveTaskBtn) saveTaskBtn.addEventListener("click", saveTask);
if (addTaskBtn) addTaskBtn.addEventListener("click", () => openModal());

// =====================
// Initial Call
// =====================

renderTasks();



