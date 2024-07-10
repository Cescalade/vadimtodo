const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.querySelector('.filter');
const newTask = document.querySelector('.newTask');
const searchTask = document.getElementById('search');
const template = document.querySelector("#template");

updateList();


function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function taskListClick(event) {
  const taskItem = event.target.closest('.task');

  if (!taskItem) return;

  const tasks = getTasks();
  const taskIndex = Array.from(taskList.children).indexOf(taskItem);
  const task = tasks[taskIndex];

  if (event.target.matches("div")) {
    if (taskItem.classList.contains('done')) {
      task.isDone = false;
    } else {
      task.isDone = true;
    }
  }

  if (event.target.classList.contains("delete")) {
    taskItem.remove();
    tasks.splice(taskIndex, 1);
  }
  
  if (event.target.classList.contains("markImportant")) {
    if (taskItem.classList.contains('marked')) {
      taskItem.classList.remove('marked');
      event.target.textContent = 'MARK IMPORTANT';
      task.isImportant = false;
    } else {
      task.isImportant = true;
    }
  }

  saveTasks(tasks);
  updateList();
}

function addTask(taskInput, taskList, template) {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Don't add task if task is empty");
    return;
  }

  const newElemTask = {
    text: taskText,
    isImportant: false,
    isDone: false
  };

  const tasks = getTasks();
  tasks.push(newElemTask);
  saveTasks(tasks);
  taskInput.value = "";
  updateList();
}

function filterClick(event) {
  const elements = document.querySelectorAll("button");
  if (!event.target.matches('button')) return;

  Array.from(elements).forEach((el) => {
    el.classList.remove("active-f");
  });

  event.target.classList.add("active-f");

  const tasks = taskList.querySelectorAll(".task");
  tasks.forEach((task) => {
    if (event.target.classList.contains("active-b")) {
      if (task.classList.contains("done")) {
        task.hidden = true;
      } else {
        task.hidden = false;
      }
    } else if (event.target.classList.contains("done-b")) {
      if (task.classList.contains("active")) {
          task.hidden = true;
      } else {
          task.hidden = false;
      }
    } else {
      task.hidden = false;
    }
  });

  (!event.target.classList.contains('all-b')) ? newTask.classList.add("hiden") : newTask.hidden = false;
}

function searchInput() {
  let request = this.value.trim().toLowerCase();
  const tasks = taskList.querySelectorAll(".task p");
  if (request !== '') {
    newTask.hidden = true;
    tasks.forEach((task) => {
      if (task.textContent.toLowerCase().search(request) === -1) {
        task.closest(".task").hidden = true;
      } else {
        task.closest(".task").hidden = false;
      }
    });
  } else {
    newTask.hidden = false;
    tasks.forEach((task) => {
      task.closest(".task").hidden = false;
    });
  }
}

function updateList() {
  taskList.innerHTML = '';
  
  const tasks = getTasks();
  tasks.forEach(task => {
    const taskItem = template.content.cloneNode(true);
    const textOfTask = taskItem.querySelector(".markDone");
    textOfTask.textContent = task.text;

    const taskElement = taskItem.querySelector('.task');
    if (task.isDone) {
      taskElement.classList.remove('active');
      taskElement.classList.add('done');
    } else {
      taskElement.classList.add('active');
    }
    if (task.isImportant) {
      taskElement.classList.add('marked');
      taskItem.querySelector(".markImportant").textContent = 'NOT IMPORTANT';
    }
    
    taskList.appendChild(taskItem);
  });
}

searchInput.onfocus = function() {
  newTask.hidden = true;
}
searchInput.onblur = function() {
  newTask.hidden = false;
}

searchTask.oninput = searchInput;
addTaskButton.addEventListener("click", () => addTask(taskInput, taskList, template));
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    addTask(taskInput, taskList, template);
  }
});
filter.addEventListener("click", filterClick);
taskList.addEventListener("click", taskListClick);