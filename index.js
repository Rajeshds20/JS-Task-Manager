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
let filterCategory = 'all';
let filterStatus = false;
let showComplete = false;

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
        saveTasksToLocalStorage();
    } catch (error) {
        alert("Error: " + error);
    } finally {
        clearFields();
    }
}

// Function to update the task list
function updateTaskList() {
    const taskList = document.getElementById("task-list");
    // console.log("Task List : ", taskList);
    taskList.innerHTML = "";

    switch (filterCategory) {
        case "work":
            tasks.forEach((task, index) => {
                if (task.category === "work" && (!filterStatus || showComplete === task.completed)) {
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
                if (task.category === "personal" && (!filterStatus || showComplete === task.completed)) {
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
                if (task.category === "shopping" && (!filterStatus || showComplete === task.completed)) {
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
                if (!filterStatus || showComplete === task.completed) {
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
    }
    if (taskList.innerHTML === "") {
        taskList.innerHTML = "<p>No tasks to display</p>";
    }
}

// Function to mark a task as completed
function completeTask(index) {
    tasks[index].completed = true;
    updateTaskList();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    console.log("Stored Tasks : ", storedTasks);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
}

// Function to clear input fields
function clearFields() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-priority").value = "";
    document.getElementById("task-due-date").value = "";
}

function displayFilteredTasks() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    // console.log("Selecte Filter :", selectedFilter);
    filterCategory = selectedFilter;
    updateTaskList();
}

function displayFilterByStatus() {
    const selectedFilter = document.querySelector('input[name="complete"]:checked').value;
    console.log("Selecte Filter :", selectedFilter);
    if (selectedFilter === 'all') {
        filterStatus = false;
        showComplete = false;
        updateTaskList();
    } else if (selectedFilter === 'completed') {
        filterStatus = true;
        showComplete = true;
        updateTaskList();
    } else if (selectedFilter === 'incomplete') {
        filterStatus = true;
        showComplete = false;
        updateTaskList();
    }
}

// Event listener for filter radio buttons
const filterRadios = document.querySelectorAll('input[name="filter"]');
filterRadios.forEach(radio => {
    radio.addEventListener('change', displayFilteredTasks);
});

const filterByStatusRadios = document.querySelectorAll('input[name="complete"]');
filterByStatusRadios.forEach(radio => {
    radio.addEventListener('change', displayFilterByStatus);
});


// Initialize the task list
loadTasksFromLocalStorage();
