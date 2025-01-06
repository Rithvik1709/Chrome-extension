const backgrounds = [
  'url("https://source.unsplash.com/random/1920x1080?nature")',
  'url("https://source.unsplash.com/random/1920x1080?city")',
  'url("https://source.unsplash.com/random/1920x1080?space")'
];

const quotes = [
  "Believe you can and you're halfway there.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Act as if what you do makes a difference. It does."
];

const background = document.getElementById("background");
const quoteElement = document.getElementById("quote");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

background.style.backgroundImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];

quoteElement.innerText = quotes[Math.floor(Math.random() * quotes.length)];

function saveTodos() {
  const todos = Array.from(todoList.children).map((li) => li.textContent.replace("Remove", "").trim());
  chrome.storage.sync.set({ todos });
}

function loadTodos() {
  chrome.storage.sync.get("todos", (data) => {
    if (data.todos) {
      data.todos.forEach((todo) => addTodoItem(todo));
    }
  });
}

function addTodoItem(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const button = document.createElement("button");
  button.textContent = "Remove";
  button.onclick = () => {
    li.remove();
    saveTodos();
  };

  li.appendChild(button);
  todoList.appendChild(li);
}

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && todoInput.value) {
    addTodoItem(todoInput.value);
    todoInput.value = "";
    saveTodos();
  }
});

loadTodos();
