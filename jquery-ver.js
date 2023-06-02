let taskData = [];

$(document).ready(function () {
    renderTasks();
});

const taskList = $("#taskList");
const doneTaskList = $("#doneTaskList");
const addTaskBtn = $("#addTaskBtn");
const taskInput = $("#taskInput");

function renderTasks() {
    $.ajax({
        type: "GET",
        url: "https://6479ea22a455e257fa640d61.mockapi.io/todo",
        success: function (response) {
            taskList.empty();
            doneTaskList.empty();
            taskData = response;
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
            $("#loading").hide();
        }
    });

}

function addTask() {
    $("#loading").show();

    const newDescription = taskInput.val();

    const objUpdate = {
        description: newDescription,
        isDone: false,
    };
    $.ajax({
        type: "POST",
        url: `https://6479ea22a455e257fa640d61.mockapi.io/todo`,
        data: JSON.stringify(objUpdate),
        contentType: "application/json",
        success: function (response) {
            renderTasks();
            taskInput.val("");
        }
    });
}

function toggleTaskStatus(id) {
    $("#loading").show();

    const currentTask = taskData.find((obj) => obj.id === id);
    const objUpdate = {
        ...currentTask,
        isDone: !currentTask.isDone,
    };
    $.ajax({
        type: "PUT",
        url: `https://6479ea22a455e257fa640d61.mockapi.io/todo/${id}`,
        data: JSON.stringify(objUpdate),
        contentType: "application/json",
        success: function (response) {
            renderTasks();
        }
    });
}

function editTask(id) {
    $("#loading").show();

    const currentTask = taskData.find((obj) => obj.id === id);
    const newDescription = prompt('Nhập nội dung task mong muốn:', currentTask.description);

    if (newDescription === null) {
        $("#loading").hide();
        return;
    }
    const objUpdate = {
        ...currentTask,
        description: newDescription,
    };
    $.ajax({
        type: "PUT",
        url: `https://6479ea22a455e257fa640d61.mockapi.io/todo/${id}`,
        data: JSON.stringify(objUpdate),
        contentType: "application/json",
        success: function (response) {
            renderTasks();
        }
    });
}

function deleteTask(id) {
    $("#loading").show();

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
