
// ///function declaration
// // function greeting() {
// //     console.log('Good morning class')
// // }

// ///function expression

// const greet = function() {
//     console.log('Good afternoon, Allen')
// }


// function greeting(name) {
//     console.log(`Good morning everyone, my name is ${name}`)
// }

// // const calcAge = (name, yearOfBirth) => {
// //     console.log(`Good morning everyone, my name is ${name} and i am ${2025 - yearOfBirth} years old`)
// // }


// // calcAge('Allen', 1998)
// // calcAge('comfort', 2002)
// // calcAge('Akin', 2000)
// // calcAge('Godfrey', 2001)

// // const calcAge = function (birthYear) {
// //     return 2025 - birthYear
// // }


// // const yearsUntilRetirement = function(birthYear, firstName)   {
// //     const age = calcAge(birthYear)
// //     const retirement = 65 - age


// //     if(retirement > 0) {
// //         console.log(`${firstName} retires in ${retirement}`)
// //     } else {
// //         console.log(`${firstName} has already retired`)
// //     }
// // }


// // console.log(yearsUntilRetirement(1998, 'Allen'))

// /////Array
// const friend1 = 'James'
// const friend2 = 'Margret'
// const friend3 = 'comfort'

// console.log(friend1, friend2, friend3)


// // console.log(friends[2])


// ////Basic Array methods
// const friends = ['James', 'Margret', 'Comfort', 'Hammed']
//  friends.push('Daniel') ///Add to the end
// // const newFriends = friends.unshift('Daniel') /// Add to the beginning

//PLEASE NOTE THAT I CHOOSE TO USE SEMI-COLUMN TO MARK THE END OF EACH LINE TO AVOID CONFUSING MYSELF 

//// DOM ELEMENTS
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const totalTaskElement = document.getElementById('total-tasks');
const completedTaskElement = document.getElementById('completed-tasks');
const pendingTaskElement = document.getElementById('pending-tasks');
const filterButtons = document.querySelectorAll('.filter-btn');

//// TASK DATA STORAGE
let tasks = [];
let taskIdCounter = 1;
let currentFilter = 'all';


// ===================== FUNCTIONS =====================

// >>> Add Task Function <<<
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task');

  const task = {
    id: taskIdCounter++,
    text: taskText,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(task);
  taskInput.value = "";
  addBtn.disabled = true;

  renderTasks();
}

// >>> Toggle Task Completion <<<
function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) task.completed = !task.completed;
  renderTasks();
}

// >>> Delete Task <<<
function deleteTask(taskId) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

// >>> Edit Task <<<
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const li = document.querySelector(`li[data-id='${taskId}']`);
  const taskContent = li.querySelector('.task-content');

  taskContent.innerHTML = `
    <input type="text" class="edit-input" value="${task.text}" />
    <button class="btn save-btn">Save</button>
    <button class="btn cancel-btn">Cancel</button>
  `;

  const input = taskContent.querySelector('.edit-input');
  input.focus();

  taskContent.querySelector('.save-btn').addEventListener('click', () => saveEdit(taskId, input.value.trim()));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveEdit(taskId, input.value.trim());
  });
  taskContent.querySelector('.cancel-btn').addEventListener('click', renderTasks);
}

function saveEdit(taskId, newText) {
  if (newText === '') return alert('Task cannot be empty');
  const task = tasks.find(t => t.id === taskId);
  if (task) task.text = newText;
  renderTasks();
}

// >>> Render Task List <<<<
function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (filteredTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    filteredTasks.forEach(task => taskList.appendChild(createTaskElement(task)));
  }

  updateStats();
}

// >>> Create Single Task Element <<<
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;
  li.dataset.id = task.id;

  li.innerHTML = `
    <div class="task-content">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="btn edit-btn">Edit</button>
      <button class="btn delete-btn">Delete</button>
    </div>
  `;

  li.querySelector('.task-checkbox').addEventListener('change', () => toggleTask(task.id));
  li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
  li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));

  return li;
}

// >>> Update Task Stats <<<
function updateStats() {
  totalTaskElement.textContent = tasks.length;
  completedTaskElement.textContent = tasks.filter(task => task.completed).length;
  pendingTaskElement.textContent = tasks.filter(task => !task.completed).length;
}

// >>> Initialize App <<<
function init() {
  addBtn.disabled = true;
  renderTasks();
}


// ===================== EVENT LISTENERS =====================

// Enable/Disable Add Button
taskInput.addEventListener('input', function () {
  addBtn.disabled = this.value.trim() === "";
});

// Add task on Enter key
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});

// Add task on Button Click
addBtn.addEventListener('click', addTask);

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.filter;
    renderTasks();
  });
});

// Initialize App
init();





