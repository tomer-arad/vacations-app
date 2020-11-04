import React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';

import MainWrapper from './components/MainWrapper';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(logger, thunk))
)

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `'Ubuntu', 'sans-serif'`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500,
   "fontWeightBold": 700
  }
});

function App(){

  return (
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
          <Router>
            <Switch>
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/vacations' component={MainWrapper} />
                <Route path='/' component={Login} />
            </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App;
