import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Parcours_reducer } from './parcours_reducer';
import { Promotions_reducer } from './promotions_reducer';
import { Leaders_reducer } from './leaders_reducer';
import { Comments_reducer } from './comments_reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './form_reducer';
import { auth_reducer } from './auth_reducer';



export const ConfigureStore = () => {
    // We create a store to save all the states from the reducer
    // we have the initialstate as property to the forms so that when we reload the form, we still 
    const store = createStore(
        combineReducers({
            parcours: Parcours_reducer,
            comments: Comments_reducer,
            promotions: Promotions_reducer,
            leaders: Leaders_reducer,
            authStatus : auth_reducer, 
            //we keep tracking the form state
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        // we supplie the two enhancers for our store
        applyMiddleware(thunk, logger)
    );
    return store;
}