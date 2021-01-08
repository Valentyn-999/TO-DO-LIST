import axios from "axios";

const instans = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'cfb6e34f-6374-462a-8da5-72f5e5249b28'
    }
})

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

export const todolistAPI = {
    getTodoLists() {
        return instans.get<Array<TodolistType>>('todo-lists')
    },
    postTodoList(title: string) {
        return instans.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodoList(todolistId: string) {
        return instans.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instans.put<CommonResponseType>(`todo-lists/${todolistId}`,{title})
    }
}
