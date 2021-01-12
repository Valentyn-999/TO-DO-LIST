import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodoListAC, TodoListDomainType,
    TodoListReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", order: 0, addedDate: '', filter: 'all'},
        {id: todolistId2, title: "What to buy", order: 0, addedDate: '', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = TodoListReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = TodoListReducer(startState, AddTodolistAC(newTodolistTitle) )

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";



    const endState = TodoListReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = "completed";


    const endState = TodoListReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});




