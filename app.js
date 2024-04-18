const form = document.querySelector(".todo-box__input form");
const inputTodo = document.querySelector(".todo-box__input .input-text");
const todoList = document.querySelector(".todo-box__list ul");
const liCount = document.querySelectorAll("li").length;

form.addEventListener("submit", addBtnClick);
loadTodo();

function addBtnClick(event) {
  event.preventDefault();
  const key = new Date().getTime();
  addTodo(key, inputTodo.value, false);
  saveTodo(key, inputTodo.value);
  inputTodo.value = "";
}

function addTodo(key, todo, Check) {
  const newLi = document.createElement("li");
  newLi.setAttribute("id", key);

  const newCheckBox = document.createElement("input");
  newCheckBox.setAttribute("type", "checkbox");
  newCheckBox.checked = Check;
  newLi.appendChild(newCheckBox);
  newCheckBox.addEventListener("click", isChecked);

  const newTodo = document.createElement("span");
  newTodo.innerText = todo;
  newLi.appendChild(newTodo);

  const newXbtn = document.createElement("input");
  newXbtn.setAttribute("type", "button");
  newXbtn.setAttribute("value", "x");
  newLi.appendChild(newXbtn);
  newXbtn.addEventListener("click", deleteTodo);

  if (Check) newLi.classList.add("checked");
  todoList.appendChild(newLi);
}

function saveTodo(key, todoValue) {
  let storedItems = JSON.parse(localStorage.getItem("items")) || {};
  storedItems[key] = todoValue;
  localStorage.setItem("items", JSON.stringify(storedItems));
}

function deleteTodo(event) {
  const button = event.target;
  const removeId = button.parentElement.id;

  let storedItems = JSON.parse(localStorage.getItem("items")) || {};
  delete storedItems[removeId];
  localStorage.setItem("items", JSON.stringify(storedItems));

  let storedChecks = JSON.parse(localStorage.getItem("checks")) || [];
  storedChecks = storedChecks.filter((e) => e !== removeId);
  localStorage.setItem("checks", JSON.stringify(storedChecks));

  button.parentElement.remove();
}

function loadTodo() {
  const storedItems = JSON.parse(localStorage.getItem("items")) || {};
  const storedChecks = JSON.parse(localStorage.getItem("checks")) || [];

  if (storedItems.length !== 0) {
    for (let key in storedItems) {
      storedChecks.includes(key)
        ? addTodo(key, storedItems[key], true)
        : addTodo(key, storedItems[key], false);
    }
  }
}

function isChecked(event) {
  const checkBox = event.target;
  const CHECKED = "checked";
  let storedChecks = JSON.parse(localStorage.getItem("checks")) || [];

  if (checkBox.checked) {
    checkBox.parentElement.classList.add(CHECKED);
    storedChecks.push(checkBox.parentElement.id);
  } else {
    checkBox.parentElement.classList.remove(CHECKED);
    storedChecks = storedChecks.filter((e) => e !== checkBox.parentElement.id);
  }

  localStorage.setItem("checks", JSON.stringify(storedChecks));
}
