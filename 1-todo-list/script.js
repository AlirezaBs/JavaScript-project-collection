// Select all elements
const list = document.querySelector("#list")
const form = document.querySelector("#new-item-form")
const input = form.querySelector("#item-input")


// When  I submit the form add a new element
form.addEventListener('submit', e => {
    e.preventDefault()
    // Create a new item and add it to the list
    let item = document.createElement('div')
    item.innerText = input.value
    item.classList.add('list-item')
    list.appendChild(item)

    // Clear input
    input.value = ''

    // Setup event listener to detect item when clicked
    item.addEventListener('click', e => {
        item.remove()
    })
})