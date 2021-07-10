import * as ActionTypes from './ActionTypes';

export const Parcours_reducer = (state = {
    isLoading: true,
    errMess: null,
    reducerParcours: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_PARCOURS:
            return{...state, isLoading: false, errMess: null, reducerParcours: action.payload}
        case ActionTypes.PARCOURS_LOADING:
            // in this case we use the spread operator to return whatever argument the state parameter is at 
            return{...state, isLoading: true, errMess: null, reducerParcours: []}
        case ActionTypes.PARCOURS_FAILED:
            return{...state, isLoading: false, errMess: action.payload, reducerParcours: []}

        default:
            return state;
    }
}