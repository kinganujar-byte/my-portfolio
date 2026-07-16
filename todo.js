let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Add event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

clearBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTodos();
    });
});

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';

    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><p>No tasks yet. Add one to get started!</p></div>';
    } else {
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo(${todo.id})">
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    updateTaskCount();
}

function updateTaskCount() {
    const activeTodos = todos.filter(t => !t.completed).length;
    taskCount.textContent = `${activeTodos} task${activeTodos !== 1 ? 's' : ''} remaining`;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial render
renderTodos();