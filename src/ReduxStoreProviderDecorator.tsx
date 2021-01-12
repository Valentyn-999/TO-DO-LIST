import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {TodoListReducer} from './state/todolists-reducer'
import {v1} from 'uuid'
import {tasksReducer} from "./state/task-reducer";
import { AppRootStateType } from './state/store'
import {TaskpPiorities, TaskStatuses} from "./API/todolistAPI";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",  addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",  addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low },
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2",
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
)
