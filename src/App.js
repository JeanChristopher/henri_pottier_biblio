import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {  
  
  render (){
    return (
      /* The provider is the redux component that provides the store to our App component as props*/
      <Provider store={store}>
        {/*the browser router tag enables our application to be able to run react router*/}
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;
