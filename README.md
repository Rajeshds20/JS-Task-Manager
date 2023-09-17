# JS-Task-Manager

## Usage : 
1. Use the Task Manager fields at the top as the form to add your tasks, also select all the fields of the task you want to add.
2. The form automatically updates the UI to display all your tasks already added.
3. This website also uses Local Storage of the browser to store and load the previous tasks you already added.
4. You can then keep track  of your tasks by its category.
5. You can also filter by them to view your incomplete tasks.
6. By default on mounting, the website checks its localstorage and loads them into website.

## Code Part :
### JS Classes :
1. Created a Class that can be used to work on tasks.
2. Created and Used objects for each task that is created, and the class includes all the fields that a task can have.
```
class Task {
    constructor(name, category, priority, dueDate) {
        this.name = name;
        this.category = category;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false; //Initially
    }
}
```
### Try, Catch and Finally :
3. Used Try, Catch and Finally to validate the new task creation, and if the user didnot fill any of the field in the task creation, a custom Exception is thrown.
4. If the task is validated correctly, the new task is added to tasks list.
5. The Catch block is used to alert the user to fill all the fields of new task creation form.
6. Atlast Finally is used to clear all the values from the inputs.
```
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
```
### Switch Statements :
7. Switch statements are used in the display function, to control only the tasks that belong to selected category are displayed.
8. The condition of the category displaying is used from switch condition.
```
function updateTaskList() {
    const taskList = document.getElementById("task-list");
    // console.log("Task List : ", taskList);
    taskList.innerHTML = "";

    switch (filterCategory) {
        case "work":
            // Code for rendering the tasks with category as - work
            break;
        case "personal":
            // Code for rendering the tasks with category as - personal
            break;
        case "shopping":
            // Code for rendering the tasks with category as - shoppingbreak;
        default:
            // Code for rendering all the tasks
            break;
    }
    // If the tasks list is empty or no tasks matching the filter criteria
    if (taskList.innerHTML === "") {
        taskList.innerHTML = "<p>No tasks to display</p>";
    }
}
```

### Displaying each task :
```
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

else if (task.completed) {
    taskItem.innerHTML += `
    <p class="completed">✔️Completed</p>
`;
}
taskList.appendChild(taskItem);
```
