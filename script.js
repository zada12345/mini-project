const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');
const filterSelect = document.getElementById('filter-select');

let tasks = [];

function renderTasks() {
    taskList.innerHTML = '';

    const filter = filterSelect.value;
    const today = new Date().toISOString().split('T')[0];

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'today') return task.date === today;
        if (filter === 'upcoming') return task.date > today;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = `${task.name} (Deadline: ${task.date})`;
        li.appendChild(span);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Hapus';
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = taskInput.value.trim();
    const date = dateInput.value;

    if (!name) {
        alert('Tugas tidak boleh kosong!');
        return;
    }
    if (!date) {
        alert('Tanggal harus diisi!');
        return;
    }

    tasks.push({ name, date });
    taskInput.value = '';
    dateInput.value = '';
    renderTasks();
});

filterSelect.addEventListener('change', renderTasks);

renderTasks();