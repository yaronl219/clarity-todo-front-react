import { httpService } from "./httpService"

export const todoService = {
    getTodos,
    updateTodo,
    removeTodo,
    addTodo
}

async function getTodos() {
    try {
        const todos = await httpService.get()
        return todos
    } catch (err) {
        console.log(err)
    }
}

async function updateTodo(todo) {
    try {
        const id = todo.id
        const res = await httpService.put(id,todo)
        return res
    } catch (err) {
        console.log(err)
    }    
}

async function removeTodo(todoId) {
    await httpService.remove(todoId)
}

async function addTodo(todo) {
    await httpService.post('',todo)
}