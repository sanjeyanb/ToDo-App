const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="actions">
        <button class="complete" data-index="${index}">✔</button>
        <button class="delete" data-index="${index}">✖</button>
      </div>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  renderTodos();
});

list.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete")) {
    todos.splice(index, 1);
  } else if (e.target.classList.contains("complete")) {
    todos[index].completed = !todos[index].completed;
  }
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();
