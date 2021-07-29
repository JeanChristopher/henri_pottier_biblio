import * as ActionTypes from './ActionTypes';

export const Books_reducer = (state = {
    isLoading: true,
    errMess: null,
    reducerBooks: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_BOOKS:
            return{...state, isLoading: false, errMess: null, reducerBooks: action.payload}
        case ActionTypes.BOOKS_LOADING:
            // in this case we use the spread operator to return whatever argument the state parameter is at 
            return{...state, isLoading: true, errMess: null, reducerBooks: []}
        case ActionTypes.BOOKS_FAILED:
            return{...state, isLoading: false, errMess: action.payload, reducerBooks: []}

        default:
            return state;
    }
}