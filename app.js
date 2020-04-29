//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addToDo(event) {
	//Prevent form from submitting
	event.preventDefault();
	//Todo DIV element
	const todoDiv = document.createElement('div');
	//Todo DIV's class
	todoDiv.classList.add('todo');
	//Create LI element
	const newTodo = document.createElement('li');
	//Create innerText in LI element
	newTodo.innerText = todoInput.value;
	//Create LI's class
	newTodo.classList.add('todo-item');
	//Add LI element to DIV element
	todoDiv.appendChild(newTodo);
	//Add Todo to LocalStorage
	saveLocalTodos(todoInput.value);
	//Checkmark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//Checkmark Trash Button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	//Apprend to List
	todoList.appendChild(todoDiv);
	//Clear TodoInput Value
	todoInput.value = '';
}

function deleteCheck(e) {
	const item = e.target;
	//Delete ToDo
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		//Animation
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	}

	//Checkmark ToDo
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		const todoDiv = document.createElement('div');
		//Todo DIV's class
		todoDiv.classList.add('todo');
		//Create LI element
		const newTodo = document.createElement('li');
		//Create innerText in LI element
		newTodo.innerText = todo;
		//Create LI's class
		newTodo.classList.add('todo-item');
		//Add LI element to DIV element
		todoDiv.appendChild(newTodo);
		//Checkmark button
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add('complete-btn');
		todoDiv.appendChild(completedButton);
		//Checkmark Trash Button
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);
		//Apprend to List
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
