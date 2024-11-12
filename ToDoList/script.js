let taskArr = [];

const inputRef = document.querySelector("#taskInput");
const totalTasksUl = document.getElementById("totalTasks");
const completedTasksUl = document.getElementById("completedTasks");


function AddTask() {
    const taskText = inputRef.value.trim();
    if (taskText) {
        taskArr.push({ text: taskText, completed: false });
        inputRef.value = '';  
        displayTasks();
    }
}

function displayTasks() {
    totalTasksUl.innerHTML = '';  
    completedTasksUl.innerHTML = '';  

    taskArr.forEach((task, index) => {
        const liRef = document.createElement('li');
        liRef.innerText = task.text;
        liRef.className = `list-group-item ${task.completed ? 'list-group-item-success' : ''}`;

        const taskDiv = document.createElement('div');
        taskDiv.className = 'd-flex justify-content-between align-items-center';
        taskDiv.appendChild(liRef);

       
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteTask(index);
        taskDiv.appendChild(deleteButton);

        
        if (!task.completed) {
            const confirmButton = document.createElement('button');
            confirmButton.className = 'btn btn-success btn-sm';
            confirmButton.innerText = "Check";
            confirmButton.onclick = () => checkTask(index);
            taskDiv.appendChild(confirmButton);
            totalTasksUl.appendChild(taskDiv);  
        } else {
            completedTasksUl.appendChild(taskDiv);  
        }
    });
}


function checkTask(index) {
    taskArr[index].completed = !taskArr[index].completed;
    displayTasks();
}


function deleteTask(index) {
    taskArr.splice(index, 1);  
    displayTasks(); 
}
