/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false,
        };
        // In order to make this methos available for use within our JSX code we need to bind it to the JS elment THIS
        this.toggleNav = this.toggleNav.bind(this);
    }
    /**
     * function that toggles the menu items whether we click on the navtoggler
     */
    toggleNav(){
        //will be true if the original state is false and false if the original state is true
        this.setState({isNavOpen: !this.state.isNavOpen})
    }
    render() {
        return(
            <>
                {/*We use he propertiy expand so that the navbar will collapse for md to sm screns */}
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        {/*the NavbarBrand tag makes the Nantes à velo text clickable and it's linked to the Redirect tag in MainComponent || we use mr-auto to force sibling colums away from one another*/}
                        <NavbarBrand className="mr-auto" href="/">Henri Pottier </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu"><span className="fa fa-book fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/basket"><span className="fa fa-shopping-basket fa-lg"></span> Mon panier</NavLink>
                                </NavItem>
                            </Nav>                       
                        </Collapse>                     
                    </div>                    
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Henri Pottier</h1>
                                <p>Offre spéciale sur la collection Henri Pottier pour découvrir les aventures chevaleresques de ce petit sorcier</p>
                            </div>

                        </div>
                    </div>
                </Jumbotron>               
            </>
        );
    }
}

export default Header ;