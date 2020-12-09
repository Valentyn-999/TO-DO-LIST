import {TasksStateType, TodolistType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {RemoveTodolistActionType, AddTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string

}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string,
    isDone: boolean,
    todoListID: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todoListID: string
}


export type ActionType = RemoveTaskActionType | AddTaskActionType | AddTodolistActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case 'ADD-TASK': {
            const task: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const copyState = {...state}
            copyState[action.todoListID] = [task, ...copyState[action.todoListID]]
            // return copyState
            return {...state, [action.todoListID]: [task, ...state[action.todoListID]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) return task
                    else return {...task, isDone: action.isDone}
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) return task
                    else return {...task, title: action.title}
                })
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistID]: []}
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => (
    {type: "REMOVE-TASK", taskID, todoListID}
)
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => (
    {type: "ADD-TASK", title, todoListID}
)
export const ChangeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => (
    {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID}
)
export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => (
    {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
)
