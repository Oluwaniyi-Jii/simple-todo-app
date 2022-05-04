const todos = [{
    text: 'Order Food',
    completed: false
}, {
    text: 'Clean Kitchen',
    completed: true
}, {
    text: 'Eat Food',
    completed: true
}, {
    text: 'Do Work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

/**
 * The renderTodos function takes in two arguments, todos and filters, and then filters the todos array
 * based on the filters object, and then displays the filtered todos on the screen.
 * @param todos - an array of todo objects
 * @param filters - 
 * @returns the filteredTodos array.
 */
let renderTodos = (todos, filters) => {
    /* Filtering the todos array and returning only the todos that include the text in the searchText
    property of the filters object. */
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter((todo) => {
        if (filters.hideCompleted == true) {
            return !todo.completed
        } else {
            return true
        }
    })

    /* Filtering the filteredTodos array and returning only the todos that are not completed. */
    let incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    /* Selecting the element with the id of todos and assigning it to the variable body. */
    let todoSummary = document.createElement('h2')
    todoSummary.textContent = `You have ${incompleteTodos.length} more things to do`
    let body = document.querySelector('#todos')
    body.appendChild(todoSummary)

    /* Creating a paragraph element for each todo in the filteredTodos array and then appending it to
    the element with the id of todos. */
    filteredTodos.forEach(function (todo) {
        let todoContent = document.createElement('p')
        todoContent.textContent = `${todo.text}`
        document.querySelector('#todos').appendChild(todoContent)
    })
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    todos.push({
        text : e.target.elements.newTodo.value,
        completed : false
    })
    renderTodos(todos, filters)
    e.target.elements.newTodo.value = ''
})
document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})