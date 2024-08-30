document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const deviceNameContainer = document.getElementById('device-name-container');
    const deviceNameInput = document.getElementById('device-name');
    const saveDeviceNameBtn = document.getElementById('save-device-name-btn');

    let deviceName = localStorage.getItem('deviceName');

    // Se o nome do dispositivo não estiver salvo, mostrar a interface para nomeá-lo
    if (!deviceName) {
        deviceNameContainer.style.display = 'block';
    } else {
        deviceNameContainer.style.display = 'none';
        loadTasks();
    }

    saveDeviceNameBtn.addEventListener('click', () => {
        deviceName = deviceNameInput.value.trim();
        if (deviceName) {
            localStorage.setItem('deviceName', deviceName);
            deviceNameContainer.style.display = 'none';
            loadTasks();
        }
    });

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(`tasks_${deviceName}`)) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-task');
        deleteBtn.addEventListener('click', () => {
            removeTask(task);
            taskList.removeChild(li);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    const addTask = () => {
        const task = taskInput.value;
        if (task) {
            addTaskToDOM(task);
            saveTask(task);
            taskInput.value = '';
        }
    };

    const saveTask = (task) => {
        const tasks = JSON.parse(localStorage.getItem(`tasks_${deviceName}`)) || [];
        tasks.push(task);
        localStorage.setItem(`tasks_${deviceName}`, JSON.stringify(tasks));
    };

    const removeTask = (task) => {
        let tasks = JSON.parse(localStorage.getItem(`tasks_${deviceName}`)) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem(`tasks_${deviceName}`, JSON.stringify(tasks));
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
