import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function AddTodo({ onAdd }) {

    const [name, setName] = useState('')
    
    function onSubmit(ev) {
        ev.preventDefault()
        onAdd(name)
        setName('')
    }

    return (
        <div className="add-todo-container">
            <form onSubmit={onSubmit}>
                <TextField label="Add Todo" value={name} onChange={(ev) => setName(ev.target.value)} />
                <Button onClick={onSubmit}>Add</Button>
            </form>
        </div>
    )
}
