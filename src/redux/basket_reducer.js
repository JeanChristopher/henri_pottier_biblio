/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import * as ActionTypes from './ActionTypes';
import {getPrice} from './ActionCreators';

/**
 * reducer that manages the state of the basket and what changes in it
 * @param {*} state defines the state our basket reducer
 * @param {functions} action
 * @returns
 */
export const Basket_reducer = (state = {
    isLoading: true,
    errMess: null,
    reducerBasket : [],
    price : 0,
}, action) => {
    switch(action.type){
        // in case the user add sommething to the basket
        case ActionTypes.ADD_BASKET:
            let item = state.reducerBasket.concat(action.payload)
            let obtainedPrice = getPrice(item)
            return{...state, isLoading: false, errMess: null, reducerBasket: item, price : obtainedPrice}
        // in this case we use the spread operator to return whatever argument the state parameter is at
        case ActionTypes.BASKET_LOADING: 
            return{...state, isLoading: true, errMess: null, reducerBasket: [], price:0, reducerUniqueItems: []}
        case ActionTypes.BASKET_FAILED:
            return{...state, isLoading: false, errMess: action.payload, reducerBasket: [], price:0, reducerUniqueItems: []}
        default:
            return state;
    }
}