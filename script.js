const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.querySelector('.filter')
const newTask = document.querySelector('.newTask');
const searchTask = document.getElementById('search');
const template = document.querySelector("#template");
taskList.innerHTML = localStorage.getItem('todo');

function taskListClick(event) {
    const taskItem = event.target.parentElement;
    if (event.target.matches("div")){
      if (event.target.classList.contains("taskList")) return;
      if (event.target.classList.contains('done')){
        event.target.classList.remove('done');
        event.target.classList.add('active');
      }
      else {
        event.target.classList.remove('active');
        event.target.classList.add('done');
      }
    }
  
    if (event.target.classList.contains("delete")) taskItem.remove();
    
    if (event.target.classList.contains("markImportant")) {
      if (taskItem.classList.contains('marked')){
        taskItem.classList.remove('marked');
        event.target.textContent = 'MARK IMPORTANT';
      }
      else{
        taskItem.classList.add('marked');
        event.target.textContent = 'NOT IMPORTANT';
      }
    }
    updateList();
}
function addTask(taskInput, taskList, template) {
    const task = taskInput.value;
    if (task.trim() === "") {
      alert("Don't add task if task is empty");
      return;
    }
    const taskItem = template.content.cloneNode(true);
    const textOfTask = taskItem.querySelector(".markDone");
    textOfTask.textContent = task;
    
    taskList.append(taskItem);
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
  
    (!event.target.classList.contains('all-b'))? newTask.hidden = true : newTask.hidden = false;
}
function searchInput(){
    let request = this.value.trim().toLowerCase();
    tasks = taskList.querySelectorAll("p");
    if (request !== ''){
        newTask.hidden = true;
        tasks.forEach((task) => {
            if (task.textContent.toLowerCase().search(request) === -1){
                task.closest(".task").hidden = true;
            }
            else{
                task.closest(".task").hidden = false;
            }
        })
    }
    else {
        newTask.hidden = false;
        tasks.forEach((task) => {
            task.closest(".task").hidden = false;
        });
    }
}
function updateList(){
    if(taskList.innerHTML.length){ 
        localStorage.setItem('todo', taskList.innerHTML);
    }
    else { 
        localStorage.removeItem('todo');
    }
}

searchTask.oninput = searchInput;
addTaskButton.addEventListener("click", () => addTask(taskInput, taskList, template));
filter.addEventListener("click", filterClick);
taskList.addEventListener("click", taskListClick);

 
