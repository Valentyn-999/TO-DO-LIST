export type StateType = {
    name: string
    age: number
    childrenCount: number
}
export type ActionType = {
    type: string
    [key: string]: string
}
// case 'CHANGE-NAME'
// case 'CHANGE-AGE'
// case 'CHANGE-CHILDREN-COUNT'

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            const newState = {...state}
            newState.age = state.age + 1
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            // state.childrenCount = state.childrenCount + 1;
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE-NAME':
            return {...state, name: action.name};
        default:
            throw new Error("I don't understand this type")
    }
}