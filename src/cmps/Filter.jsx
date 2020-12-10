import React, { useState } from 'react'
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core/';


export function Filter(props) {

    const [nameFilter, setNameFilter] = useState('')
    const [onlyCompletedFilter, setOnlyCompletedFilter] = useState('all')
    const [sortBy, setSortBy] = useState('created')

    function onChangeNameFilter(ev) {
        const name = ev.target.value
        setNameFilter(name)
        props.onChangeName(name)
    }

    function onSetCompletedFilter(ev) {
        const value = ev.target.value
        setOnlyCompletedFilter(value)
        props.onSetCompletedFilter(value)
    }

    function onSetSortBy(ev) {
        const value = ev.target.value
        setSortBy(value)
        props.onSetSortBy(value)
    }
    return (
        <div className="filters-container">
            <TextField value={nameFilter} onChange={onChangeNameFilter} label="Search task by name" color="secondary" />
            <FormControl>
                <InputLabel id="completed-filter">Display Only Completed</InputLabel>
                <Select
                    labelId="completed-filter"
                    value={onlyCompletedFilter}
                    onChange={onSetCompletedFilter}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'completed'}>Completed</MenuItem>
                    <MenuItem value={'incomplete'}>Incomplete</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="sort-by">Sort By</InputLabel>
                <Select
                    labelId="sort-by"
                    value={sortBy}
                    onChange={onSetSortBy}
                >
                    <MenuItem value={'created'}>Created</MenuItem>
                    <MenuItem value={'name-asc'}>Title - Ascending</MenuItem>
                    <MenuItem value={'name-des'}>Title - Descending</MenuItem>
                    <MenuItem value={'completedDate-asc'}>Completion Date - Ascending</MenuItem>
                    <MenuItem value={'completedDate-des'}>Completion Date - Descending</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
