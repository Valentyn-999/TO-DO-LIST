import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskpPiorities, TaskStatuses} from "../API/todolistAPI";

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
    status: TaskStatuses,
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

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todoListID];
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todoListID] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListID];
            const newTask = {id: v1(), title: action.title, status: TaskStatuses.New,
                todoListId: action.todoListID, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskpPiorities.Low};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListID] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            return ({...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskID ? {...task, status: action.status} : task)
            });
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};

            let tasks = stateCopy[action.todoListID];
            let task = tasks.find(t => t.id === action.taskID);
            if (task) {
                task.title = action.title;
            }
            return ({...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => task.id === action.taskID ? {...task, title: action.title} : task)
            });
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.todolistID] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default: return state
    }
}

export const RemoveTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => (
    {type: "REMOVE-TASK", taskID, todoListID}
)
export const AddTaskAC = (title: string, todoListID: string): AddTaskActionType => (
    {type: "ADD-TASK", title, todoListID}
)
export const ChangeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => (
    {type: "CHANGE-TASK-STATUS", taskID, status, todoListID}
)
export const ChangeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => (
    {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
)
