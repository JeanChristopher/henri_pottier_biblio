import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, ModalFooter, Button, Row, Col, Label, CustomInput } from 'reactstrap'
import { Link } from 'react-router-dom' ;
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'
/**
 * 
 * @param {selectedPacour} param0 receive the selected parcour params as a props
 * @returns { Card html element } The details of the parcours that has been clicked
 */

function RenderParcours({selectedPacour}) {
    return(                    
        <Card>
            <CardImg top src={baseUrl + selectedPacour.image} alt={selectedPacour.name}></CardImg>               
            <CardBody>
                <CardTitle tag="h4"> {selectedPacour.name} </CardTitle>
                <CardText>{selectedPacour.description}</CardText>
            </CardBody>
        </Card>                  
    );
}

/**
 * 
 * @param {*} param0 receive the selected parcour comments propertie as a props from MainComponent
 * @returns { html element } The comment of the parcours that has been clicked
 */
function RenderComments({selectedPacourComments, addComment, parcoursId_pl}){
    if(selectedPacourComments != null){
        return(
        <div>
            { selectedPacourComments.map((selectedPacourComment) =>
                <>
                    {<ul key={selectedPacourComment.id} className="list-unstyled"><li>{selectedPacourComment.comment}</li><li>--{selectedPacourComment.author.firstname + " " + selectedPacourComment.author.lastname + " , " + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(selectedPacourComment.updatedAt)))}</li></ul>}
                </>               
            )
        }
        <div> <CommentForm parcoursId={parcoursId_pl} addComment={addComment}/> </div>
        </div>                     
        );        
    }
    else {
        return(
            <div></div>
        );
    }
}

const required = (val) => val && val.length ;
// receives the length as a parameter and also the value entered by the user 
const maxLength = (len) => (val) => !(val) || (val.length) <= len ;
const minLength = (len) => (val) => (val) && (val.length) >= len ;


class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormOpen: false
        };
        // In order to make this methos available for use within our JSX code we need to bind it to the JS elment THIS
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm(){
        //will be true if the original state is false and false if the original state is true
        this.setState({isFormOpen: !this.state.isFormOpen})
    }
    handleSubmit(values){
        this.toggleForm();
        // we add the new comment array to the view
        // we take the addComment function as props from the renderComments function
        this.props.addComment(this.props.parcoursId, values.rating, values.yourname, values.message);
    }

    render() {
        return(
        <div>  
       <Button outline color="success" onClick={this.toggleForm}><span class="fa fa-pencil fa-lg" aria-hidden="true"></span> Submit comment</Button>          
        <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm} className="ml-auto">
        <ModalHeader toggle={this.toggleForm}>Submit Comment</ModalHeader>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <ModalBody>                    
                    <Row className="form-group">
                    <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="yourname">Your Name</Label>
                            {/* Control is a connected component, it will use the model prop to connect itself to the Redux store and dispatch the appropriate actions for each event handler */}
                                {/* eslint-disable-next-line react/jsx-pascal-case*/}
                            <Control.text model=".yourname" id="yourname" name="yourname"
                                placeholder=""
                                className="form-control"
                                validators={{required, minLength: minLength(2), maxLength: maxLength(15)}}/>
                                <Errors
                                    className="text-danger" 
                                    model=".yourname" 
                                    show="touched" 
                                    messages={{
                                        required: "Please enter a your name",
                                        minLength: " Must be greater than 2 characters",
                                        maxLength: " Must be 15 characters or less"
                                    }} 
                                />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="message" md={0}>Your Comment</Label>
                                {/* eslint-disable-next-line react/jsx-pascal-case*/}
                            <Control.textarea model=".message" id="message" name="message"
                                rows="6"
                                className="form-control" />
                        </Col>
                    </Row>                                    
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary">Submit</Button>
                    <Button color="secondary" onClick={this.toggleForm}>Cancel</Button>
                </ModalFooter>
            </LocalForm> 
        </Modal>
        </div>
        );
    }
}

/**
 * 
 * @param {*} props the parameters tranfered from Parcours detail component is the Main component
 * @returns { html element } render in the view the html element built in RenderParcours and RenderComments functions
 */

const ParcourDetail = (props) => {
    if (props.parcour_isLoading){
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
                    <h4>{props.parcour_ErrMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.selectedPacour != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedPacour.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedPacour.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderParcours selectedPacour= {props.selectedPacour} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments selectedPacourComments = {props.comments}
                            addComment={props.addComment}
                            parcoursId_pl={props.selectedPacour._id}/>
                    </div>
                </div>
            </div>                                           
        );
    }
    else {
        return(<div></div>);
    }
}
        
export default ParcourDetail ;