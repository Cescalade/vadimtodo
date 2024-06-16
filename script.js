
function setActiveFilter(e){
    const elements = document.getElementsByClassName("active-f");
    Array.from(elements).forEach((el)=>{
        el.classList.remove("active-f")

    })
    e.classList.add("active-f")

}
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
taskList.innerHTML = localStorage.getItem('todo');

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
