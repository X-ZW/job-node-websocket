import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import './config'
import './index.css'


ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'))
