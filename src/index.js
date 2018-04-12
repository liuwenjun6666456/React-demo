import React from 'react';
import ReactDOM from 'react-dom';
import {Provider}from'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './config/axios-interceptors';
import Login from './page/login/login';
import Register from './page/register/register';
const store = createStore(
    compose(
        applyMiddleware(thunk),//处理异步
        window.devToolsExtension ? window.devToolsExtension() : {}//使用调试工具
    )
)

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();
