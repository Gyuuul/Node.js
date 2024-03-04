import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import {thunk} from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware= applyMiddleware(promiseMiddleware, thunk)(createStore);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <App />
  </Provider>
);

reportWebVitals();
