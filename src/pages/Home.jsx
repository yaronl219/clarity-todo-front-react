import React, { useEffect, useState } from 'react'
import AddTodo from '../cmps/AddTodo'
import { Todo } from '../cmps/Todo'
import { todoService } from '../services/todoService'

export function Home() {

    const [todos,setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [])

    async function getTodos() {
        const todos = await todoService.getTodos()
        if (!todos) return
        console.log(todos)
        setTodos(todos)
    }
    
    async function updateTodo(updatedTodo) {
        await todoService.updateTodo(updatedTodo)
        getTodos()
    }

    async function onRemoveTodo(todoId) {
        await todoService.removeTodo(todoId)
        getTodos()
    }

    async function onAddTodo(todoName) {
        const todo = {
            name: todoName,
            completedAt: null
        }

        await todoService.addTodo(todo)
        getTodos()
    }

    return (
        <div className="home-container">
            {todos.map(todo => <Todo key={todo.id} todo={todo} onUpdate={updateTodo} onRemove={onRemoveTodo} />)}
            <AddTodo onAdd={onAddTodo} />
        </div>
    )
}
