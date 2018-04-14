import React from 'react';
import ReactDOM from 'react-dom';
import {Provider}from'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './config/axios-interceptors';
import AuthRoute from './component/auth-route/auth-route';
import Login from './page/login/login';
import Register from './page/register/register';
import BossInfo from './page/bossInfo/bossInfo';
import GeniusInfo from './page/geniusInfo/geniusInfo';
import {Reducers} from './redux'
const store = createStore(
    Reducers,
    compose(
        applyMiddleware(thunk),//处理异步
        window.devToolsExtension ? window.devToolsExtension() : f=>f//使用调试工具
    )
)

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
registerServiceWorker();
