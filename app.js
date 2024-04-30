const form = document.querySelector(".todo-box__input form");
const inputTodo = document.querySelector(".todo-box__input .input-text");
const todoList = document.querySelector(".todo-box__list ul");

let todos = [];

class Todo {
  constructor(key, content, checked) {
    this.key = key;
    this.content = content;
    this.checked = checked;
  }
}

function onClickSubmit(event) {
  event.preventDefault();
  const key = new Date().getTime();
  const content = inputTodo.value;
  const checked = false;

  const newTodo = new Todo(key, content, checked);
  todos.push(newTodo);
  saveTodos();
  printTodos(newTodo);
  inputTodo.value = "";
}

function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = savedTodos;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function printTodos(newTodo) {
  const newList = document.createElement("li");
  const newCheck = document.createElement("input");
  const newSpan = document.createElement("span");
  const newI = document.createElement("i");
  const newBtn = document.createElement("button");

  newList.setAttribute("id", newTodo.key);
  newCheck.setAttribute("type", "checkbox");
  newCheck.checked = newTodo.checked;
  newCheck.addEventListener("click", onClickCheck);
  newSpan.innerText = newTodo.content;
  newI.setAttribute("class", "fa-solid fa-x");
  newBtn.append(newI);
  newBtn.addEventListener("click", onClickDelate);

  if (newTodo.checked) newList.classList.add("checked");

  newList.append(newCheck, newSpan, newBtn);
  todoList.appendChild(newList);
}

function onClickCheck(event) {
  const checkParents = event.target.parentElement;
  todos.map((todo) => {
    if (todo.key === +checkParents.id) {
      todo.checked = !todo.checked;
      checkParents.classList.toggle("checked");
    }
  });
  saveTodos();
}

function onClickDelate(event) {
  const buttonParents = event.target.parentElement.parentElement;
  todos = todos.filter((todo) => todo.key !== +buttonParents.id);
  buttonParents.remove();
  saveTodos();
}

loadTodos();
todos.length > 0
  ? todos.forEach((todo) => printTodos(todo))
  : console.log("no saved date");
form.addEventListener("submit", onClickSubmit);
