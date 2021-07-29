/**
 * @file a file for the basket component
 * @author Jean Christopher AMANY
 * @license GNU
 * @copyright Copyright (c) 2021; PUBLICIS SAPIENT; J.C. Amany
 */

import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import BookDetail from './BookDetailComponent';
import Basket from './basketComponent'
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { addBasket, fetchBooks} from '../redux/ActionCreators';

/**
 * Map our redux store state that becomes available to our components in form of props
 * @param {data} state our components state rendered by the redux store  
 */
const mapStateToProps = state => {
  return{
    books_s: state.books,
    comments_s: state.comments,
    basket_s: state.basket
  }
}

/**
 * 
 * @param {*} dispatch make whatever action object that we defined available within the application 
 * @returns 
 */

const mapDispatchToProps = (dispatch) => ({
  fetchBooks: () => {dispatch(fetchBooks())},
  addBasket: (bookItem) => {dispatch(addBasket(bookItem))},
 });

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  // lifecycle method that is called when the component is rendered in the view
  componentDidMount(){
      // this is the good time to fetch any data that is required in the application
      this.props.fetchBooks();
    }

  render(){
    /**
     * 
     * @param {object} match A match object contains information about how a <Route path> matched the URL. match objects contain the following properties:
     * @returns {object} params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
                         isExact - (boolean) true if the entire URL was matched (no trailing characters)
                         path - (string) The path pattern used to match. Useful for building nested <Route>s
                         url - (string) The matched portion of the URL. Useful for building nested <Link>s
     */
    const BooksWithId = ({match}) => {
        return(
        // we chose the chosen book where the id of the selected books matches the id of the books on the match parameter property
        // the addcomment action is now available within our maincomponent as a prop
        <BookDetail selectedBook = {this.props.books_s.reducerBooks.filter((book) => book.isbn === match.params.bookId)[0]}
                       book_isLoading={this.props.books_s.isLoading}
                       book_ErrMess={this.props.books_s.errMess}
                       addBasket = {this.props.addBasket}
        />
      );
    }


    
  return (    
    <div>
      <Header/>
      <Switch>
        {/* we use exact path because the same path will be used into other component */}
        {/* we use a functional component to pass props to the menu component */}
        <Route exact path="/menu" component={() => <Menu books_p = {this.props.books_s.reducerBooks} 
                                                         books_areLoading = {this.props.books_s.isLoading}
                                                         books_ErrMess = {this.props.books_s.errMess}/>}/>
        {/*The specified :booksId parameter becomes available as a parameter in an object */}
        <Route path="/menu/:bookId" component={BooksWithId}/>
        <Route path="/menu/:bookId" component={BooksWithId}/>
        <Route exact path="/basket" component={() => <Basket basket_p={this.props.basket_s.reducerBasket} price_p ={this.props.basket_s.price} />} />
        {/* we redirect anything that does not match the routes specified to menu */}
        <Redirect to="/menu"/>
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