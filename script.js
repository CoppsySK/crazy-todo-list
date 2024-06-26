document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document.getElementById('add-task-btn').addEventListener('click', function() {
        const taskText = document.getElementById('new-task').value.trim();
        if (taskText) {
            addTask(taskText);
            document.getElementById('new-task').value = '';
        } else {
            alert('Task cannot be empty!');
        }
    });
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, completed = false) {
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <div class="todo-item">
            <input type="checkbox" ${completed ? 'checked' : ''}>
            <span>${text}</span>
        </div>
        <button class="edit-btn">&#9998;</button>
        <button class="delete-btn">&times;</button>
    `;

    document.getElementById('todo-list').appendChild(li);

    li.querySelector('input[type="checkbox"]').addEventListener('change', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    li.querySelector('.edit-btn').addEventListener('click', function() {
        const newText = prompt('Edit task:', text);
        if (newText) {
            li.querySelector('span').innerText = newText;
            saveTasks();
        }
    });

    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    saveTasks();
}

