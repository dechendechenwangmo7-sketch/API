const API_URL = '/tasks'; 
const taskList = document.getElementById('task-list');
const loading = document.getElementById('loading');
const taskInput = document.getElementById('task-input');
const taskCount = document.getElementById('task-count');

async function fetchTasks() {
  try {
    loading.style.display = 'block';
    const response = await fetch(API_URL);
    const tasks = await response.json();
    
    taskList.innerHTML = ''; 
    loading.style.display = 'none';

    taskCount.textContent = tasks.length;

    if (tasks.length === 0) {
      taskList.innerHTML = `
        <li style="justify-content: center; color: var(--text-muted); padding: 40px; border: none;">
          No tasks in your workspace.
        </li>`;
      return;
    }

    tasks.forEach(task => {
      const li = document.createElement('li');
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <div class="task-content">
          <i class="fa-regular ${task.completed ? 'fa-circle-check' : 'fa-circle'} task-icon" onclick="toggleTask(${task.id}, ${!task.completed})"></i>
          <span class="task-title">${task.title}</span>
        </div>
        <div class="btn-group">
          <button onclick="toggleTask(${task.id}, ${!task.completed})" title="${task.completed ? 'Undo' : 'Complete'}">
            <i class="fa-solid ${task.completed ? 'fa-rotate-left' : 'fa-check'}"></i>
          </button>
          <button class="btn-delete" onclick="deleteTask(${task.id})" title="Delete">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    loading.innerHTML = "Failed to connect to server.";
  }
}

async function addTask() {
  const title = taskInput.value.trim();
  if (!title) return taskInput.focus();

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    taskInput.value = '';
    fetchTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function toggleTask(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
}

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

document.addEventListener('DOMContentLoaded', fetchTasks);