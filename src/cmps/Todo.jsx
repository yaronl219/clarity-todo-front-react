import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

export function Todo({ todo, onUpdate, onRemove }) {

    const [isEditing, setEditing] = useState(false)
    const [todoName, setTodoName] = useState('')
    const [completedAt, setCompletedAt] = useState(null)

    useEffect(() => {
        setTodoName(todo.name)
    }, [todo.name])

    useEffect(() => {
        if (completedAt === todo.completedAt) return
        setCompletedAt(todo.completedAt)
    })

    function onCheckTodo() {
        let newCheckStatus;
        if (!completedAt) {
            newCheckStatus = Date.now()
        } else {
            newCheckStatus = null
        }
        setCompletedAt(newCheckStatus)
        onUpdate({
            id: todo.id,
            name: todoName,
            completedAt: newCheckStatus
        })
    }

    return (
        <Paper >
            <div className="todo-container">
                <Checkbox
                    checked={!!completedAt}
                    onChange={onCheckTodo}
                    inputProps={{ 'aria-label': 'checkbox' }}
                />
                <div className="todo-name">
                    <p>{todoName}</p>
                </div>
                <button onClick={() => onRemove(todo.id)}>DELETE</button>
            </div>
        </Paper>
    )
}
