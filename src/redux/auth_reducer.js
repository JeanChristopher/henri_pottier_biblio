import * as ActionTypes from './ActionTypes';

/**
 * Reducer that store the state and actions of the comments object  
 * @param {state} state the actual state of the comment objects
 * @param {fuction} action function that specifies what changes to be done with the actual state  
 * @returns {Array} a new array of comments
 */
export const auth_reducer = (state = {
        isLoading: false,
        isSignedUp: localStorage.getItem('creds') ? true : false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null
    }, action) => {
        switch (action.type) {
            case ActionTypes.LOGIN_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: false,
                    user: action.creds
                };
            case ActionTypes.LOGIN_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    errMess: '',
                    token: action.token
                };
            case ActionTypes.LOGIN_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    errMess: action.message
                };
            case ActionTypes.LOGOUT_REQUEST:
                return {...state,
                    isLoading: true,
                    isAuthenticated: true
                };
            case ActionTypes.LOGOUT_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    token: '',
                    user: null
                };
            case ActionTypes.SIGNUP_REQUEST:
                return {...state,
                    isLoading: false,
                    isSignedUp: false,
                    user: null
                };
            case ActionTypes.SIGNUP_SUCCESS:
                return {...state,
                    isLoading: false,
                    isSignedUp: true,
                    user: null
                };
            case ActionTypes.SIGNUP_FAILIURE:
                return {...state,
                    isLoading: false,
                    isSignedUp: false,
                    user: null
                };
                    default:
                return state
        }
    }