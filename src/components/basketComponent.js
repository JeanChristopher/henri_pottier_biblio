/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

/**
 * Renders 
 * @param {object} book book added to the basket 
 * @returns {card} book and the price of the basket 
 */

function RenderMenuItem({book}) {
    return(
        <Card>
            <CardImg top src={book.cover} alt={book.title}></CardImg>
        </Card>
    );
}

/**
 * 
 * @param {*} props 
 * @returns 
 */

const Basket = (props) => {
    console.log(props.price_p);
    if (props.basket_p.length !== 0) {

        const basketItems = props.basket_p.map((book_payer) => {
            return (
                // key is a special parameters needeed when we have to display a list of items
                <div key= {book_payer.isbn} className="col-12 col-md-5 m-1">
                    <RenderMenuItem book={book_payer}/>
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Mon panier</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Mon panier</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {basketItems}            
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <h4>Vous n'avez aucun article dans votre panier </h4>
                </div>
            </div>
        )
    }
}

export default Basket;