import * as ActionTypes from './ActionTypes';
import {PARCOURS} from '../shared/parcours';
import {baseUrl} from '../shared/baseUrl';
import { Redirect } from 'react-router';


/**
 * action function to add a new comment about a specific parcours
 * we send the action to the store
 * @param {number} parcoursId 
 * @param {float} rating 
 * @param {string} author 
 * @param {string} comment
 */
export const addComment = (parcourId, rating, author, comment) => ({
    // the type field allows to specify the type of action that we retrieve from the action type file
    // the payload field is there to carry whatever additional information we want to add   
    type: ActionTypes.ADD_COMMENT,
    payload : {
        parcourId : parcourId,
        rating : rating,
        author : author,
        comment : comment
    }
})

/// REDUX THUNK : A THUNK IS A MIDDLEWARE THAT ALLOWS TO RETURN FUNCTION RATHER THAN JUST ACTIONS, ITS PERMITS TO DELAY THE EXECUTION OF AN ACTION BASED ON THE REALISATION OF ANTOTHER FUNCTION 

/**
 * a thunk that that dispatch a fecth parcours only if the parcoursloading function has been executed
 * @returns function
 */

export const fetchParcours = () => (dispatch) => {
    dispatch(parcoursLoading(true));

    return fetch(baseUrl+ 'dishes')
        .then(response => response.json())
        .then(parcours => dispatch(addParcours(parcours)));
    
   /* setTimeout(() => {
        dispatch(addParcours(PARCOURS))
    },1000)*/
}

/**
 * an action to process the parcours loading 
 * @returns function
 */

 export const parcoursLoading = () => ({
    type: ActionTypes.PARCOURS_LOADING
})

/**
 * an action to return an error message when a parcour loading has failed 
 * @returns function
 */

export const parcoursFailed = (errmess) => ({
    type: ActionTypes.PARCOURS_FAILED,
    payload : errmess 
})

/**
 * an action to process the parcours loading 
 * @returns un parcours
 */

 export const addParcours = (reducerParcours) => ({
    type: ActionTypes.ADD_PARCOURS,
    payload : reducerParcours
})

export const fetchComments = () => (dispatch) => {
    
    return fetch(baseUrl+ 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
}
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload : errmess
})

export const addComments = (reducerComments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload : reducerComments 
})

// ACTIONS POUR LOGGUER L'UTILISATEUR

/**
 * 
 * @param {object} creds user login information 
 * @returns creds
 */
export const loginRequest = (creds) => ({
    type: ActionTypes.LOGIN_REQUEST,
    creds
})

export const loginSuccess = (response) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token : response.token
})

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // we dispatch the creds entered by the user
    dispatch(loginRequest(creds))

    return fetch(baseUrl+ 'users/login' ,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    }).then(response => {
        if (response.ok){
            return response
        }
        else{
            var error = new Error('Error '+response.status + " : " + response.statusText)
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    // once we've made sure that we'are authenticated, we retrieve the token
    .then(response => response.json())
    .then(response => {
        if (response.success){
            // we set the login in the localstorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(loginSuccess(response));
        }
        else{
            var error = new Error('Error '+response.status + " : " + response.statusText)
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

// ACTIONS POUR PERMERTTRE à L'UTILISATEUR DE SE DELOGGUER

export const logoutResquest = () => ({
    type: ActionTypes.LOGOUT_REQUEST,
})
export const logoutSuccess = () => ({
    type: ActionTypes.LOGOUT_SUCCESS,
})

export const logoutUser = () => (dispatch) => {
    dispatch(logoutResquest());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(logoutSuccess());

}


// ACTIONS POUR ENREGISTRER UN NOUVEL UTILISATEUR

export const signUpRequest = (creds) => ({
    type: ActionTypes.SIGNUP_REQUEST,
    creds
})

export const signUpSuccess = () => ({
    type: ActionTypes.SIGNUP_SUCCESS
})

export const signUpError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILIURE,
        message
    }
}

export const registerUser = (creds) => (dispatch) => {

    dispatch(signUpRequest(creds))

    return fetch(`${baseUrl}users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
        .then(response => {
            if (response.ok){
                return response
            }
            else{
                var error = new Error('error '+ response.status + " : " + response.statusText)
                error.response = response
                throw error;
            }
        })
        .then(response => response.json)
        .then(response => {
            if (response.success){
                dispatch(signUpSuccess)
            }
            else{
                var error = new Error('error '+ response.status + " : " + response.statusText)
                error.response = response
                throw error;
            }
        })
        .catch(error => dispatch(signUpError(error.message)))

}
