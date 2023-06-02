
// var defaultId = 0;

// class Task {
//     constructor(description) {
//         this.id = `task-${++defaultId}`;
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

$(document).ready(function () {
    renderTasks();
});

const taskList = $("#taskList");
const doneTaskList = $("#doneTaskList");
const addTaskBtn = $("#addTaskBtn");
const taskInput = $("#taskInput");

function renderTasks() {
    taskList.empty();
    doneTaskList.empty();

    $.ajax({
        type: "GET",
        url: "https://6479ea22a455e257fa640d61.mockapi.io/todo",
        success: function (response) {
            response.forEach(function (task) {
                const listItem = document.createElement('div');

                const taskElement = `
                        <div>
                        <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleTaskStatus('${task.id}')"/>
                        <span>Task ${task.id}:</span>
                        <span>${task.description}</span>
                        </div>
                        <div>
                        <button class="edit-btn" onclick="editTask('${task.id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
                        </div>
                `;

                listItem.innerHTML = taskElement;
                listItem.classList.add('task');

                if (task.isDone) {
                    listItem.classList.add('done');
                    doneTaskList.append(listItem);
                } else {
                    taskList.append(listItem);
                }
            });
        }
    });

}

function addTask() {
    const description = taskInput.val();

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
    renderTasks();
}

function editTask(id) {
    const newDescription = prompt('Nhập nội dung task mong muốn:');

    const objUpdate = {
        description: newDescription,
        isDone: false,
    };
    $.ajax({
        type: "PUT",
        url: `https://6479ea22a455e257fa640d61.mockapi.io/todo/${id}`,
        data: objUpdate,
        success: function (response) {
            renderTasks();
        }
    });
}

function deleteTask(id) {
    $.ajax({
        type: "DELETE",
        url: `https://6479ea22a455e257fa640d61.mockapi.io/todo/${id}`,
        success: function (response) {
            renderTasks();
        }
    });
}

// just convert to jq-click
addTaskBtn.click(addTask);
