import React, { useEffect, useState } from 'react'
import AddTodo from '../cmps/AddTodo'
import { Todo } from '../cmps/Todo'
import { todoService } from '../services/todoService'

import { Filter } from '../cmps/Filter';
import { utilsService } from '../services/utilsService';

export function Home() {

    const [todos, setTodos] = useState([])

    const [nameFilter, setNameFilter] = useState('')
    const [onlyCompletedFilter, setOnlyCompletedFilter] = useState('all')
    const [sortBy, setSortBy] = useState('created')

    useEffect(() => {
        getTodos()
    }, [])

    async function getTodos() {
        const todos = await todoService.getTodos()
        if (!todos) return
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

    function getTodosForDisplay() {
        let todosForDisplay = todos.filter(todo => todo.name.toLowerCase().includes(nameFilter.toLowerCase()))
        if (onlyCompletedFilter === 'completed') {
            todosForDisplay = todosForDisplay.filter(todo => todo.completedAt)
        } else if (onlyCompletedFilter === 'incomplete') {
            todosForDisplay = todosForDisplay.filter(todo => !todo.completedAt)
        }

        switch (sortBy) {
            case 'name-asc':
                todosForDisplay = todosForDisplay.sort((a, b) => utilsService.sortStringInObjects(a, b))
                break
            case 'name-des':
                todosForDisplay = todosForDisplay.sort((a, b) => utilsService.sortStringInObjects(b, a))
                break
            case 'completedDate-asc':
                todosForDisplay = todosForDisplay.sort((a, b) => b.completedAt - a.completedAt)
                break
            case 'completedDate-des':
                todosForDisplay = todosForDisplay.sort((a, b) => a.completedAt - b.completedAt)
                break
            default:
                todosForDisplay = todosForDisplay.sort((a, b) => a.id - b.id)
                break
        }

        return todosForDisplay
    }

    return (
        <div className="home-container">
            <div className="top-container">
                {/* <TextField value={nameFilter} onChange={(ev) => setNameFilter(ev.target.value)} label="Search task by name" color="secondary"/> */}
                <Filter onChangeName={setNameFilter} onSetCompletedFilter={setOnlyCompletedFilter} onSetSortBy={setSortBy} />
            </div>
            {getTodosForDisplay()
                .map(todo => <Todo key={todo.id} todo={todo} onUpdate={updateTodo} onRemove={onRemoveTodo} />)}
            <AddTodo onAdd={onAddTodo} />
        </div>
    )
}
