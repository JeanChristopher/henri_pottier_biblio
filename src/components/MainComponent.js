import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import ParcourDetail from './ParcourDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment, fetchParcours, fetchComments, loginUser, logoutUser, registerUser } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

/**
 * Map our redux store state that becomes available to our components in form of props
 * @param {data} state our components state rendered by the redux store  
 */
const mapStateToProps = state => {
  return{
    parcours_s: state.parcours,
    comments_s: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    authStatus_s : state.authStatus, 

  }
}

/**
 * 
 * @param {*} dispatch make whatever action object that we defined available within the application 
 * @returns 
 */

const mapDispatchToProps = (dispatch) => ({
  addComment : (parcoursId, rating, author, comment) => dispatch(addComment(parcoursId, rating, author, comment)),
  fetchParcours: () => {dispatch(fetchParcours())},
  fetchComments: () => {dispatch(fetchComments())},
  loginUser: (creds) => {dispatch(loginUser(creds))},
  logoutUser: () => {dispatch(logoutUser())},
  registerUser: (creds) => {dispatch(registerUser(creds))},
  // feedback is the name of the form we want to reset
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  // lifecycle method that is called when the component is rendered in the view
  componentDidMount(){
      // this is the good time to fetch any data that is required in the application
      this.props.fetchParcours();
      this.props.fetchComments();
  }

  render(){
    const HomePage = () =>  
    {
      return(
        // we pass in the parcours, promotions, leaders where the attribute featured is true to be displayed on the homepage
        // because we defined new properties in the reducerParcours in the reducer we now access to the upadted parcours via this property
        <Home parcours_hp={this.props.parcours_s.reducerParcours.filter((parcour) => parcour.featured)[0]}
              parcour_isLoading={this.props.parcours_s.isLoading}
              parcour_ErrMess={this.props.parcours_s.errMess}
              promotions_hp={this.props.promotions.filter((promotion) => promotion.featured === true)[0]}
              leaders_hp={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
    /**
     * 
     * @param {object} match A match object contains information about how a <Route path> matched the URL. match objects contain the following properties:
     * @returns {object} params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
                         isExact - (boolean) true if the entire URL was matched (no trailing characters)
                         path - (string) The path pattern used to match. Useful for building nested <Route>s
                         url - (string) The matched portion of the URL. Useful for building nested <Link>s
     */
    const ParcoursWithId = ({match}) => {
        return(
        // we chose the chosen parcour where the id of the selected parcours matches the id of the parcours on the match parameter property
        // the addcomment action is now available within our maincomponent as a prop
        <ParcourDetail selectedPacour = {this.props.parcours_s.reducerParcours.filter((parcour) => parcour._id === match.params.parcourId)[0]}
                       parcour_isLoading={this.props.parcours_s.isLoading}
                       parcour_ErrMess={this.props.parcours_s.errMess}
                       comments = {this.props.comments_s.reducerComments.filter((comment) => comment.dish === match.params.parcourId)}
                       commentsErrMess={this.props.comments_s.errMess}
                       addComment= {this.props.addComment}
        />
      );
    }
    
  return (
    
    <div>
      <Header
      authenticationStatus = {this.props.authStatus_s}
      loginUser = {this.props.loginUser}
      logoutUser = {this.props.logoutUser}
      registerUser = {this.props.registerUser}
      />
      <Switch>
        {/* The route will lead us to the homepage component */}
        <Route path="/home" component={HomePage} />
        {/* we use exact path because the same path will be used into other component */}
        {/* we use a functional component to pass props to the menu component */}
        <Route exact path="/menu" component={() => <Menu parcours_p = {this.props.parcours_s.reducerParcours} 
                                                         parcours_areLoading = {this.props.parcours_s.isLoading}
                                                         parcours_ErrMess = {this.props.parcours_s.errMess}/>}/>
        {/*The specified :parcoursId parameter becomes available as a parameter in an object */}
        <Route path="/menu/:parcourId" component={ParcoursWithId}/>
        <Route exact path="/contactus" component= {() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />}/>
        <Route exact path="/aboutus" component={() => <About leaders_ap={this.props.leaders} />} />
        {/* we redirect anything that does not match the routes specified to home */}
        <Redirect to="/home"/>
      </Switch>
      <Footer />
    </div>
  );
  }
}

/* we connect our main component to the redux store by using the function connect ;
   connect take mapStateToProps as one of his parameters to signal that the props that we defined in it should be available in the Main componenent;
   we also add mapDispatchToProps as a parameter for any change that we made through an action to be available within our application 
 */
// Without re-renders our Main component because location changes propagate out from the Main component

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)));