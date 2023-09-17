// Define a Task class
class Task {
    constructor(name, category, priority, dueDate) {
        this.name = name;
        this.category = category;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

// Task list
let tasks = [];

let showtasks = tasks.slice();

// Function to add a task
function addTask() {
    const taskName = document.getElementById("task-name").value;
    const taskCategory = document.getElementById("task-category").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskDueDate = document.getElementById("task-due-date").value;

    try {
        if (!taskName || !taskCategory || !taskPriority || !taskDueDate) {
            throw "All fields must be filled out.";
        }

        const task = new Task(taskName, taskCategory, taskPriority, taskDueDate);
        tasks.push(task);
        updateTaskList();
    } catch (error) {
        alert("Error: " + error);
    } finally {
        clearFields();
    }
}

// Function to update the task list
function updateTaskList(category = "all") {
    const taskList = document.getElementById("task-list");
    // console.log("Task List : ", taskList);
    taskList.innerHTML = "";

    switch (category) {
        case "work":
            tasks.forEach((task, index) => {
                if (task.category === "work") {
                    const taskItem = document.createElement("div");
                    taskItem.classList.add("task-item");
                    taskItem.classList.add(`${task.category}`);
                    taskItem.innerHTML = `
                    <p>Name: ${task.name}</p>
                    <p>Category: ${task.category}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Due Date: ${task.dueDate}</p>
                `;
                    if (!task.completed) {
                        taskItem.innerHTML += `
                        <button onclick="completeTask(${index})">Complete</button>
                    `;
                    }
                    else if (task.completed) {
                        taskItem.innerHTML += `
                        <p class="completed">✔️Completed</p>
                    `;
                    }

                    taskList.appendChild(taskItem);
                }
            });
            break;
        case "personal":
            tasks.forEach((task, index) => {
                if (task.category === "personal") {
                    const taskItem = document.createElement("div");
                    taskItem.classList.add("task-item");
                    taskItem.classList.add(`${task.category}`);
                    taskItem.innerHTML = `
                    <p>Name: ${task.name}</p>
                    <p>Category: ${task.category}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Due Date: ${task.dueDate}</p>
                `;
                    if (!task.completed) {
                        taskItem.innerHTML += `
                        <button onclick="completeTask(${index})">Complete</button>
                    `;
                    }
                    else if (task.completed) {
                        taskItem.innerHTML += `
                        <p class="completed">✔️Completed</p>
                    `;
                    }

                    taskList.appendChild(taskItem);
                }
            });
            break;
        case "shopping":
            tasks.forEach((task, index) => {
                if (task.category === "shopping") {
                    const taskItem = document.createElement("div");
                    taskItem.classList.add("task-item");
                    taskItem.classList.add(`${task.category}`);
                    taskItem.innerHTML = `
                    <p>Name: ${task.name}</p>
                    <p>Category: ${task.category}</p>
                    <p>Priority: ${task.priority}</p>
                    <p>Due Date: ${task.dueDate}</p>
                `;
                    if (!task.completed) {
                        taskItem.innerHTML += `
                        <button onclick="completeTask(${index})">Complete</button>
                    `;
                    }
                    else if (task.completed) {
                        taskItem.innerHTML += `
                        <p class="completed">✔️Completed</p>
                    `;
                    }

                    taskList.appendChild(taskItem);
                }
            });
            break;
        default:
            tasks.forEach((task, index) => {
                const taskItem = document.createElement("div");
                taskItem.classList.add("task-item");
                taskItem.classList.add(`${task.category}`);
                taskItem.innerHTML = `
                <p>Name: ${task.name}</p>
                <p>Category: ${task.category}</p>
                <p>Priority: ${task.priority}</p>
                <p>Due Date: ${task.dueDate}</p>
            `;
                if (!task.completed) {
                    taskItem.innerHTML += `
                    <button onclick="completeTask(${index})">Complete</button>
                `;
                }
                else if (task.completed) {
                    taskItem.innerHTML += `
                    <p class="completed">✔️Completed</p>
                `;
                }

                taskList.appendChild(taskItem);
            });
    }
}

// Function to mark a task as completed
function completeTask(index) {
    tasks[index].completed = true;
    updateTaskList();
}

// Function to clear input fields
function clearFields() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-priority").value = "";
    document.getElementById("task-due-date").value = "";
}

function filterTasks(filterValue) {
    if (filterValue === "all") {
        return tasks;
    } else {
        return tasks.filter(task => task.category === filterValue);
    }
}

function displayFilteredTasks() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    // console.log("Selecte Filter :", selectedFilter);
    updateTaskList(selectedFilter);
}

// Event listener for filter radio buttons
const filterRadios = document.querySelectorAll('input[name="filter"]');
filterRadios.forEach(radio => {
    radio.addEventListener('change', displayFilteredTasks);
});

// Initialize the task list
updateTaskList();
