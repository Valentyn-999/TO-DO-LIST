import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './task-reducer';
import {TasksStateType} from '../AppWithRedux';
import {AddTodolistAC, RemoveTodoListAC} from "./todolists-reducer";
import {TaskpPiorities, TaskStatuses} from "../API/todolistAPI";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low},
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low},
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low},
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = RemoveTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low},
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskpPiorities.Low }
        ]
    });
    expect(endState["todolistId2"][2]).toBeUndefined();
});
test('correct task should be added to correct array', () => {


    const action = AddTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {


    const action = ChangeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {


    const action = ChangeTaskTitleAC("2", 'beer', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('beer');
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('correct todolist should be removed', () => {

    const endState = tasksReducer(startState, RemoveTodoListAC("todolistId2"))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe("todolistId1")
    expect(endState["todolistId2"]).toBeUndefined();
});


test('new array should be added when new todolist is added', () => {


    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


