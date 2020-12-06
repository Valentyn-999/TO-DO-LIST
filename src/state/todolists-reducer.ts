import { TodolistType, FilterValuesType } from "../App";
import {v1} from "uuid";



export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
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

export const TodoListReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            let newTodolist: TodolistType = {
                id: newTodolistId,
                title: action.title,
                filter: 'all'
            };
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
                return [...state]
            }
        }
            return state
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state]
            }
            return state
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType => (
    {type: "REMOVE-TODOLIST", id: todoListID}
)
export const AddTodolistAC = (title: string): AddTodolistActionType => (
    {type: "ADD-TODOLIST", title: title}
)
export const ChangeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => (
    {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
)
export const ChangeTodolistFilter = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => (
    {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
)
