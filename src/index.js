import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AppReducer } from './reducers/AppReducer'

let store = createStore(AppReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , 
  document.getElementById('root')
);
