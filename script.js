function setActiveFilter(e){
    const elements = document.getElementsByClassName("active");
    Array.from(elements).forEach((el)=>{
        el.classList.remove("active")

    })
    e.classList.add("active")
}
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", () => {
	const task = taskInput.value;
    if (task.trim() === "") {
		alert("Don't add task if task is empty")
		return;
	}
	const taskItem = document.createElement("div");
	taskItem.classList.add("task");
	taskItem.innerHTML = `
	<button class="markDone">${task}</button>
    <button class="imprtnt"></button>
`;

	taskList.append(taskItem);
	taskInput.value = "";
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("markDone")) {
        const taskItem = event.target.parentElement;
        // if (taskItem.style.backgroundColor === "rgb(242, 242, 242)") {
        //     taskItem.style.backgroundColor = "";
        // } else {
        //     taskItem.style.backgroundColor = "#f2f2f2";
        taskItem.style.textDecoration = "line-through";
    }
});
