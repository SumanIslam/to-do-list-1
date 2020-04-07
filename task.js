// Defining the UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');

// load all event listener
loadAllEventListener();

function loadAllEventListener() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTask);
  // add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear all the task event
  clearBtn.addEventListener('click', clearTasks);

  // add search task event
  filter.addEventListener('keyup', filterTasks);
};

// get task from ls
function getTask() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    // creat a li element
    const li = document.createElement('li');
    // creat a class in li element
    li.className = 'collection-item';
    // creat a text node and append to li
    li.appendChild(document.createTextNode(task));

    // creat link under li
    const link = document.createElement('a');
    // add a class to link
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  })
}
// Add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
  } else {
    // creat a li element
    const li = document.createElement('li');
    // creat a class in li element
    li.className = 'collection-item';
    // creat a text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // creat link under li
    const link = document.createElement('a');
    // add a class to link
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear task
    taskInput.value = '';
  }
  

  e.preventDefault();
}

// store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      // remove task item from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task item form ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
// clear tasks event
function clearTasks() {
  // taskList.innerHTML = '';
  if(confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // clear task from ls
  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// add search task event
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};
