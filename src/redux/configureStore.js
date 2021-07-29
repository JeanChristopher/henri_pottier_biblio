/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Books_reducer } from './books_reducer';
import { Basket_reducer } from './basket_reducer'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    // We create a store to save all the states from the reducer
    const store = createStore(
        combineReducers({
            books: Books_reducer,
            basket: Basket_reducer,
            
        }),
        // we supplie the two enhancers for our store
        applyMiddleware(thunk, logger)
    );
    return store;
}