import {StateType, userReducer} from './user-reducer';
import {stringify} from "querystring";

test('user reducer should increment only age', () => {
    const startState: StateType = {
        name: 'Valikooo',
        age: 20,
        childrenCount: 2
    }
    const action = { type: 'INCREMENT-AGE' }

    const endState = userReducer(startState, action)

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe('Valikooo');
});

test('user reducer should increment only childrenCount', () => {
    const startState = {
        name: 'Dimych',
        age: 20,
        childrenCount: 2
    }
    const action = { type: 'INCREMENT-CHILDREN-COUNT' }

    const endState = userReducer(startState, action)

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
    expect(endState.name).toBe('Dimych');
    // your code here
});


test('user reducer should change name of user', () => {
    const startState = {
        name: 'Dimych',
        age: 20,
        childrenCount: 3
    };
    const action = {
        type: 'CHANGE-NAME',
        name: "Viktor"
    }
    const newName = 'Viktor';
    const endState = userReducer(startState, action)

    expect(endState.name).toBe("Viktor");
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

