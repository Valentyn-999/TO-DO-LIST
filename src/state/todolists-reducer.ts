import {v1} from "uuid";
import { TodolistType } from "../API/todolistAPI";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}
export type ActionType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type FilterValuesType = "all" | "active" | "completed";


export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodoListDomainType> = []

export const TodoListReducer = (state = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default: return state

    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => (
    {type: "REMOVE-TODOLIST", id: todoListID}
)
export const AddTodolistAC = (title: string): AddTodolistActionType => (
    {type: "ADD-TODOLIST", title: title, todolistID: v1()}
)
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => (
    {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
)
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => (
    {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
)
