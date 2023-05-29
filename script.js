// var defaultId = 0;

// class Task {
//     constructor(description) {
//         this.id = ++defaultId;
//         this.description = description;
//         this.isDone = false;
//     }
// }

// let tasks = [
//     new Task('Giặt áo quần'),
//     new Task('Đi siêu thị'),
//     new Task('Trả tiền điện'),
//     new Task('Đi chợ'),
// ];

// console.log(tasks);


// const taskList = document.getElementById('taskList');
// const doneTaskList = document.getElementById('doneTaskList');
// const addTaskBtn = document.getElementById('addTaskBtn');
// const taskInput = document.getElementById('taskInput');

// renderTasks();

// function renderTasks() {
//     taskList.innerHTML = "";
//     doneTaskList.innerHTML = "";

//     tasks.forEach(function (task, index) {
//         const listItem = document.createElement('div');
//         const taskElement = `
//        <div>
//        <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleTaskStatus(${index})"/>
//        <span>Task ${task.id}:</span>
//        <span>${task.description}</span>
//        </div>
//        <div>
//        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
//        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
//        </div>
//        `;

//         listItem.innerHTML = taskElement;
//         listItem.classList.add('task');

//         if (task.isDone) {
//             doneTaskList.appendChild(listItem);
//         } else {
//             taskList.appendChild(listItem);
//         }
//     });
// }

// function addTask() {
//     const description = taskInput.value;

//     if (description !== '') {
//         const task = new Task(description);
//         tasks.push(task);
//         renderTasks();
//     }
// }

// function toggleTaskStatus(index) {
//     tasks[index].isDone = !tasks[index].isDone;
//     renderTasks();
// }

// function editTask(index) {
//     const newDescription = prompt('Nhập nội dung task mong muốn:', tasks[index].description);

//     if (newDescription !== "") {
//         tasks[index].description = newDescription;
//         renderTasks();
//     } else {
//         alert('Vui lòng nhập nội dung !');
//         editTask(index);
//     }
// }

// function deleteTask(index) {
//     tasks.splice(index, 1);
//     renderTasks();
// }

// addTaskBtn.addEventListener('click', addTask);


var defaultId = 0;

class Task {
    constructor(description) {
        this.id = ++defaultId;
        this.description = description;
        this.isDone = false;
    }
}

let tasks = [
    new Task('Giặt áo quần'),
    new Task('Đi siêu thị'),
    new Task('Trả tiền điện'),
    new Task('Đi chợ'),
];

console.log(tasks);


const taskList = document.getElementById('taskList');
const doneTaskList = document.getElementById('doneTaskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');

renderTasks();

function renderTasks() {
    taskList.innerHTML = "";
    doneTaskList.innerHTML = "";

    tasks.forEach(function (task) {
        const listItem = document.createElement('div');
        const taskElement = `
       <div>
       <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})"/>
       <span>Task ${task.id}:</span>
       <span>${task.description}</span>
       </div>
       <div>
       <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
       <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
       </div>
       `;

        listItem.innerHTML = taskElement;
        listItem.classList.add('task');

        if (task.isDone) {
            doneTaskList.appendChild(listItem);
        } else {
            taskList.appendChild(listItem);
        }
    });
}

function addTask() {
    const description = taskInput.value;

    if (description !== '') {
        const task = new Task(description);
        tasks.push(task);
        renderTasks();
    }
}

function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.isDone = !task.isDone;
        renderTasks();
    }
    console.log(task);
    // renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        const newDescription = prompt('Nhập nội dung task mong muốn:', task.description);
        if (newDescription !== '') {
            task.description = newDescription;
            renderTasks();
        }
    }
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        renderTasks();
    }
}

addTaskBtn.addEventListener('click', addTask);
