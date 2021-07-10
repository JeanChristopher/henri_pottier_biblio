import * as ActionTypes from './ActionTypes';

/**
 * Reducer that store the state and actions of the comments object  
 * @param {state} state the actual state of the comment objects
 * @param {fuction} action function that specifies what changes to be done with the actual state  
 * @returns {Array} a new array of comments
 */
export const Comments_reducer = (state = {
        errMess: null,
        reducerComments:[]
    }, action) => {
    // we check if the action type is the ADD_COMMENT action that we defined in the actionTypes file
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return{...state, isLoading: false, errMess: null, reducerComments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return{...state, isLoading: false, errMess: action.payload, reducerComments: []}
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.date = new Date().toIOString();
            return{...state, reducerComments: state.reducerComments.concat(comment)}

        default:
            return state;
    }    
}