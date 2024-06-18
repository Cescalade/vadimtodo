const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.querySelector('.filter')
const newTask = document.querySelector('.newTask');
const searchTask = document.getElementById('search');
taskList.innerHTML = localStorage.getItem('todo');

searchTask.onchange = function(){
    let request = this.value.trim().toLowerCase();
    tasks = taskList.querySelectorAll(".task button:first-of-type");
    if (request != ''){
        tasks.forEach((task) => {
            if (task.textContent.toLowerCase().search(request) == -1){
                task.closest(".task").classList.add("hiden");
            }
            else{
                task.closest(".task").classList.remove("hiden")
            }
        })
    }
    else {
        tasks.forEach((task) => {
            task.closest(".task").classList.remove("hiden")
        });
    }
}

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    if (task.trim() === "") {
        alert("Don't add task if task is empty")
		return;
	}
	const taskItem = document.createElement("div");
	taskItem.classList.add("task","active");
	taskItem.innerHTML = `
	<button class="markDone">${task}</button>
    <button class="markImportant">MARK IMPORTANT</button>
    <button class="delete"></button>
    `;
    
    taskList.append(taskItem);
	taskInput.value = "";
    updateList();
    
});



filter.addEventListener("click", (e) => {
    const elements = document.querySelectorAll("button");
    if (!e.target.matches('button')) return;
    Array.from(elements).forEach((el)=>{
        el.classList.remove("active-f");

    })

    e.target.classList.add("active-f");
    
    tasks = taskList.querySelectorAll(".task");
    tasks.forEach((task)=>{
        if (e.target.classList.contains("active-b")){
            
            if (task.classList.contains("done")){
                task.classList.add("hiden");
            }
            else {
                task.classList.remove("hiden");
            }
        }
        else if (e.target.classList.contains("done-b")){
            if (task.classList.contains("active")){
                task.classList.add("hiden");
            }
            else {
                task.classList.remove("hiden");
            }
        }
        else {
            task.classList.remove("hiden");
        }
        
    });
    (!e.target.classList.contains('all-b')) ? newTask.classList.add("hiden") : newTask.classList.remove("hiden");
    
});

function updateList(){
    if(taskList.innerHTML.length){ 
        localStorage.setItem('todo', taskList.innerHTML);
    }
    else { 
        localStorage.removeItem('todo');
    }
}

taskList.addEventListener("click", (event) => {
    const taskItem = event.target.parentElement;

    if (event.target.classList.contains("markDone")) {
        if (taskItem.classList.contains('done')){
            taskItem.classList.remove('done');
            taskItem.classList.add('active');
        }
        else {
            taskItem.classList.remove('active');
            taskItem.classList.add('done');
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
});

 
