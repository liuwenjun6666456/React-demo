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
import AuthRoute from './component/auth-route/auth-route';
import {Reducers} from './redux'
const store = createStore(
    Reducers,
    compose(
        applyMiddleware(thunk),//处理异步
        window.devToolsExtension ? window.devToolsExtension() : f=>f//使用调试工具
    )
)

function Boss(){
    return <h2>11111</h2>
}

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();
