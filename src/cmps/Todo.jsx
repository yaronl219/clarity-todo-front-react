import React, { useEffect, useState } from 'react'
// import Checkbox from '@material-ui/core/Checkbox';
// import Paper from '@material-ui/core/Paper';
import { IconButton, Paper, Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { utilsService } from '../services/utilsService';

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
    }, [completedAt,todo.completedAt])

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

    function onClickEdit(ev) {
        if (!isEditing) return setEditing(true)
        onSaveName(ev)
    }

    function onSaveName(ev) {
        ev.preventDefault()
        onUpdate({
            id: todo.id,
            name: todoName,
            completedAt: todo.completedAt
        })
        setEditing(false)
    }


    return (
        <Paper >
            <div className="todo-container">
                <Checkbox
                    checked={!!completedAt}
                    onChange={onCheckTodo}
                    inputProps={{ 'aria-label': 'checkbox' }}
                />
                <div className="todo-name-container">
                    {(!isEditing) ? <p onClick={onCheckTodo}>{todoName}</p> :
                        <div className="name-change-container">
                            <form onSubmit={onSaveName}>
                                <input type="text" autoFocus value={todoName} onChange={(ev) => setTodoName(ev.target.value)} />
                            </form>
                        </div>}
                    {(completedAt) ? <small>Completed At {utilsService.parseTimestamp(completedAt)}</small> : <small></small>}
                </div>
                <IconButton onClick={onClickEdit} >
                    <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => onRemove(todo.id)}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </div>
        </Paper>
    )
}
