/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap'
import { Link } from 'react-router-dom' ;
import { Loading } from './LoadingComponent';

/**
 * render a media with the selected book
 * @param {Object} selectedBook book object that we select
 * @param {function} addBasket that takes add the selected book to the basket
 * @returns {card} render a card in the page
 */

function RenderBook({selectedBook, addBasket}) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={selectedBook.cover} alt={selectedBook.title} />
                <p><strong>{`prix : ${selectedBook.price} $`}</strong></p>
            </Media>            
            <Media body className="ml-5">
                <Media heading>{selectedBook.title}</Media>
                {selectedBook.synopsis.map((element,index) => {
                    return(
                        <p key={index}>
                            {element}
                        </p>)
                })}
                <Button outline color="primary" onClick={() => addBasket(selectedBook)}>
                    <span className="fa fa-shopping-basket">Ajouter au panier</span>
                </Button>
            </Media>
        </Media>
    );
}

/**
 * The book details core component that gets the props from the MainComponent
 * @param {*} props 
 * @returns {}
 */

const BookDetail = (props) => {

    if (props.book_isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.parcour_ErrMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.book_ErrMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.selectedBook != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedBook.title}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedBook.title}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        <RenderBook selectedBook= {props.selectedBook} addBasket={props.addBasket} />
                    </Media>
                    <p></p>
                </div>
            </div>                                           
        );
    }
    else {
        return(<div></div>);
    }
}
        
export default BookDetail ;