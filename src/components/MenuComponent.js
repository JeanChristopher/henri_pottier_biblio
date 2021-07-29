/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import React from 'react';
import { Card, CardImg, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom' ;
import { Loading } from './LoadingComponent';

    /**
     * 
     * @param {object} book we receive the books_p from the menu component and pass it to book params as props 
     * @param {function} onClick we receive the params from the onClick method in menu component as props  
     * @returns { Card html element } all the books in the books files
     */
    function RenderMenuItem({book}){
        return (
            <Card>
                {/* We introduce a react router parameter so that when we click on a chosen books it link to the path of that particular book */}                
                <Link to={`/menu/${book.isbn}`}>
                    <CardImg width="100%" src={book.cover} alt={book.title}></CardImg>
                    
                </Link>
            </Card>
        );
    }
    /**
     * 
     * @param {object} props properties of the menu component that we receive from Main component
     * @returns {card} all the books_p items that is fetched from the API
     */

    const Menu = (props) => {
        const menu = props.books_p.map((book) => {
            return (
                // key is a special parameters needeed when we have to display a list of items
                <div key= {book._id} className="col-12 col-md-5 m-1">
                    {/* We pass the props parameters to the render function */}
                    <RenderMenuItem book={book}/>
                </div>
            );
        });

        if (props.books_areLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>                
                </div>            
            );
        }

    else if (props.books_ErrMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.books_ErrMess}</h4>
                </div>                
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
    
                </div>
                <div className="row">
                    {menu}
                </div>                                
            </div>
        );
    }
    
}

export default Menu;