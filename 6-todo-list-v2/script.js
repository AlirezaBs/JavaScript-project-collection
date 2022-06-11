const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")

const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const LOCAL_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`

let todos = loadTodos()
todos.forEach(renderTodo)

// checked todos -- if same id
list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find((t) => t.id === todoId)
  todo.completed = e.target.checked
  saveTodos()

  //style todo
  parent.classList.toggle("isChecked")
})

// delete todos
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  parent.remove()
  todos = todos.filter((todo) => todo.id !== todoId)
  saveTodos()
})

// add todos
form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (!todoInput.value) return
  const newTodo = {
    name: todoInput.value,
    completed: false,
    details: `modified at ${new Date().toLocaleString()}`,
    id: new Date().valueOf().toString(),
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ""
})

// Todo details
list.addEventListener('click', (e) => {
  if(!e.target.matches('[data-button-info]')) return

  const parent = e.target.closest('.list-item')
  const todoId = parent.dataset.todoId
  const todo = todos.find(t => t.id === todoId)

  const popup = document.createElement('span')
  popup.innerText = todo.details
  popup.classList.add('popupShow')
  e.target.appendChild(popup)

  setTimeout(() => {
    popup.remove()
  },3000)
})

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.completed
  list.appendChild(templateClone)
}

// save todos
function saveTodos() {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}

// load todos
function loadTodos() {
  const todosString = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  return JSON.parse(todosString) || []
}