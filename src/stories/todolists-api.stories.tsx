import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Redux-react!!!'
        todolistAPI.postTodoList(title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        const todolistId = 'beb46c55-0baf-4a47-907f-80e07a8ee21b'
        todolistAPI.deleteTodoList(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        debugger
        const todolistId = '7bdf4c8e-44c8-4783-98ec-14c07a68dcbd'
        const title = 'Thankiiiiiiiii'
        todolistAPI.updateTodoList(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

