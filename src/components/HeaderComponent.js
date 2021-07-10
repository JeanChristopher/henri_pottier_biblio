/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalHeader, ModalFooter, ModalBody, Button, Row, Col, Label, NavbarText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


// we make 3 functions that specifies all the condition to validate the form

/**
 * Evaluate if the val argurment exists and is not empty
 * @param {string} val something entered by the user 
 * @returns true or false
 */

 const required = (val) => val && val.length ;
 // receives the length as a parameter and also the value entered by the user 
 const maxLength = (len) => (val) => !(val) || (val.length) <= len ;
 const minLength = (len) => (val) => (val) && (val.length) >= len ;
 

class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false,
            //isModalLoginOpen: false,
            isModalSignUpOpen: false
        };
        // In order to make this methos available for use within our JSX code we need to bind it to the JS elment THIS
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModalLogin = this.toggleModalLogin.bind(this);
        this.toggleModalSignUp = this.toggleModalSignUp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /**
     * function that toggles the menu items whether we click on the navtoggler
     */
    toggleNav(){
        //will be true if the original state is false and false if the original state is true
        this.setState({isNavOpen: !this.state.isNavOpen})
    }

    toggleModalLogin(){
        //will be true if the original state is false and false if the original state is true
        this.setState({
            isModalLoginOpen: !this.state.isModalLoginOpen
        })
    }

    toggleModalSignUp(){
        //will be true if the original state is false and false if the original state is true
        this.setState({
            isModalSignUpOpen: !this.state.isModalSignUpOpen
        })
    }

    handleSignUp(values, event){
        console.log("handleSignUp function")        
        if (values.signUppassword === values.conpassword){
            this.props.registerUser({firstname: values.firstname, lastname: values.lastname, admin : "" , username : values.signUpusername, password : values.signUppassword});
            this.toggleModalSignUp();
        }
        else {
            alert ("passwords should be the same");
        }
        
    }

    handleLogin(values){
        this.toggleModalLogin();
        this.props.loginUser({username: values.username, password: values.password});
    }
    handleLogout(){
        return this.props.logoutUser;
    }


    render() {
        return(
            <>
                {/*We use he propertiy expand so that the navbar will collapse for md to sm screns */}
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        {/*the NavbarBrand tag makes the Nantes à velo text clickable and it's linked to the Redirect tag in MainComponent || we use mr-auto to force sibling colums away from one another*/}
                        <NavbarBrand className="mr-auto" href="/"> Nantes à vélo </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</NavLink>                                
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus"><span className="fa fa-info fa-lg"></span> About us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu"><span className="fa fa-lis fa-lg"></span> Menu</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus"><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                            <NavItem>
                            {!this.props.authenticationStatus.isAuthenticated ?
                                <div>
                                    <Button outline color="primary" onClick={this.toggleModalLogin}><span class="fa fa-sign-in fa-lg" aria-hidden="true"></span> Login</Button>
                                    <Button outline color="primary" className = "ml-3" onClick={this.toggleModalSignUp}><span aria-hidden="true"></span> sign up</Button>
                                </div>    
                            :
                                <div>                                
                                    <Button outline color="primary" onClick={this.handleLogout()}><span class="fa fa-sign-in fa-lg" aria-hidden="true"></span> Logout</Button>
                                    <NavbarText className>
                                        <span className="fa fa-user ml-3 mr-3"></span>
                                        <p className ="ml-3">{this.props.authenticationStatus.user.username}</p>
                                    </NavbarText>
                                </div>
                            }
                            </NavItem>                           
                            </Nav>                            
                        </Collapse>                     
                    </div>                    
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Nantes à vélo</h1>
                                <p>Vous venez à Nantes pour un weekend quelques jours ou une semaine, laissez vous guider par nos itinéraires conçus sur mesure pour vous faire profiter de tout ce que peut offrir notre belle ville </p>
                            </div>

                        </div>
                    </div>
                </Jumbotron>
                {/* - when we add in the attribute toggle, when the modal toggles, if we click on the blank space in the page, it disapears
                    - when we have the toggle attribute to the modal header element, it has in the page a tiny button to help us close the modal */}
                <Modal isOpen={this.state.isModalLoginOpen} toggle={this.toggleModalLogin} className="ml-auto">
                    <ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                        <ModalBody>                            
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>                                            
                                        <Errors
                                            className="text-danger" 
                                            model=".username" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a username",
                                                minLength: " Must be greater than 2 characters",
                                                maxLength: " Must be 15 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                        {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text type="password" model=".password" id="password" name="password"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(5), maxLength: maxLength(30)}}/>
                                        <Errors
                                            className="text-danger" 
                                            model=".password" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a password",
                                                minLength: " Must be greater than 5 characters",
                                                maxLength: " Must be 30 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                    /> {' '}
                                                <strong>Remember me</strong>
                                        </Label>
                                    </div>
                                </Col>
                            </Row>                                                      
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Login</Button>
                            <Button color="secondary" onClick={this.toggleModalLogin}>Cancel</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                <Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignUp} className="ml-auto">
                    <ModalHeader toggle={this.toggleModalSignUp}>Sign up </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSignUp(values)}>
                        <ModalBody>
                        <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Firstname</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>                                            
                                        <Errors
                                            className="text-danger" 
                                            model=".firstname" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a firstname",
                                                minLength: " Must be greater than 2 characters",
                                                maxLength: " Must be 15 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                        <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Lastname</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>                                            
                                        <Errors
                                            className="text-danger" 
                                            model=".lastname" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a lastname",
                                                minLength: " Must be greater than 2 characters",
                                                maxLength: " Must be 15 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                    {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text model=".signUpusername" id="signUpusername" name="signUpusername"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>                                            
                                        <Errors
                                            className="text-danger" 
                                            model=".signUpusername" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a username",
                                                minLength: " Must be greater than 2 characters",
                                                maxLength: " Must be 15 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                        {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text type="password" model=".signUppassword" id="signUppassword" name="signUppassword"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(5), maxLength: maxLength(30)}}/>
                                        <Errors
                                            className="text-danger" 
                                            model=".signUppassword" 
                                            show="touched" 
                                            messages={{
                                                required: "Please enter a password",
                                                minLength: " Must be greater than 5 characters",
                                                maxLength: " Must be 30 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}> Confirm Password</Label>
                                <Col md={5}>
                                    {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                        {/* eslint-disable-next-line react/jsx-pascal-case*/}
                                    <Control.text type="password" model=".conpassword" id="conpassword" name="conpassword"
                                        placeholder=""
                                        className="form-control"
                                        validators={{required, minLength: minLength(5), maxLength: maxLength(30)}}/>
                                        <Errors
                                            className="text-danger" 
                                            model=".conpassword" 
                                            show="touched" 
                                            messages={{
                                                required: "Please confirm password",
                                                minLength: " Must be greater than 5 characters",
                                                maxLength: " Must be 30 characters or less"                                    
                                            }} 
                                        />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary">Sign up</Button>
                            <Button color="secondary" onClick={this.toggleModalSignUp}>Cancel</Button>
                        </ModalFooter>
                    </LocalForm>  
                </Modal>
            </>
        );
    }
}

export default Header ;