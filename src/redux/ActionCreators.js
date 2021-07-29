/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */


import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

// REDUX THUNK : A THUNK IS A MIDDLEWARE THAT ALLOWS TO RETURN FUNCTION RATHER THAN JUST ACTIONS, ITS PERMITS TO DELAY THE EXECUTION OF AN ACTION BASED ON THE REALISATION OF ANTOTHER FUNCTION 

/**
* a thunk that that dispatch a fecth books only if the booksloading function has been executed
* @returns {object} book object
*/

export const fetchBooks = () => (dispatch) => {
    dispatch(booksLoading(true));

    return fetch(baseUrl+ 'books')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(books => dispatch(addBooks(books)))
        .catch(error => dispatch(booksFailed(error.message)));  
}

/**
 * an action to process the books loading 
 * @returns {loadingComponent} component 
 */

 export const booksLoading = () => ({
    type: ActionTypes.BOOKS_LOADING
})

/**
 * an action to return an error message when the books loading has failed 
 * @returns error message
 */

export const booksFailed = (errmess) => ({
    type: ActionTypes.BOOKS_FAILED,
    payload : errmess 
})

/**
 * an action to process the books loading 
 * @returns {object} collection of books
 */

 export const addBooks = (reducerBooks) => ({
    type: ActionTypes.ADD_BOOKS,
    payload : reducerBooks
})

// ACTIONS TO MANAGE THE BASKET

export const BasketLoading = () => ({
    type: ActionTypes.BASKET_LOADING
});

export const basketFailed = (errmess) => ({
    type: ActionTypes.BASKET_FAILED,
    payload: errmess
});

export const addBasket = (bookItem) => ({
    type: ActionTypes.ADD_BASKET,
    payload: bookItem
});

/**
 * 
 * @param {object} basketItems all the items in the basket at the moment we calculate the price 
 * @returns {integer} the new price calculated
*/

export const getPrice = async (basketItems) => {
    let tableauPrix = [];
    let prixTotalCorrect;
    let prixTotal1;
    let prixTotal2
    let isbn = []
    // we retrieve two array one with the ISBNs and another with the list of price in basket
    basketItems.forEach(element => {
        tableauPrix.push(element.price);
        isbn.push(element.isbn)
    });
    try {
        // we get the offers from the list of isbn we have in our basket
        const response =  await fetch(`https://henri-potier.techx.fr/books/{${isbn}}/commercialOffers`)
        const commercialOffers = await response.json()
        const reducer = (accumulator, currentValue) => accumulator + currentValue;    
        let prixTotal = tableauPrix.reduce(reducer);
        // we calculate the price based on the commercial offers we with our ISBNs
        switch (commercialOffers.offers.length !== 0){
            case commercialOffers.offers.length === 1:
                return prixTotalCorrect = prixTotal - commercialOffers.offers[0].value
            
            case commercialOffers.offers.length === 2:
                prixTotal1 = prixTotal - commercialOffers.offers[0].value
                prixTotal2 = prixTotal - commercialOffers.offers[1].value
                prixTotal2 < prixTotal1 ? prixTotalCorrect = prixTotal2 : prixTotal2 === prixTotal1 ? prixTotalCorrect = prixTotal2 : prixTotalCorrect = prixTotal1

                return prixTotalCorrect ;
            case commercialOffers.offers.length === 3:
                let prixTotal3;
            prixTotal1 = prixTotal - commercialOffers.offers[0].value
            prixTotal2 = prixTotal - commercialOffers.offers[1].value
            prixTotal > commercialOffers.offers[2].sliceValue ? prixTotal3 = prixTotal - (commercialOffers.offers[2].value * Math.floor(prixTotal / commercialOffers.offers[2].sliceValue)) : prixTotal3 = prixTotal
            
            prixTotal3 < prixTotal2 && prixTotal3 < prixTotal1 ? prixTotalCorrect = prixTotal3 :
            prixTotal2 < prixTotal3 && prixTotal2 < prixTotal1 ? prixTotalCorrect = prixTotal2 :
            prixTotal3 === prixTotal2 && prixTotal3 === prixTotal1 ? prixTotalCorrect = prixTotal3 :
            prixTotalCorrect = prixTotal
                return prixTotalCorrect
            default:
                return prixTotal;
        }
    }
    catch(error) {
        return error.message;
    }
}