import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './src/js/App';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { gameStateReducer, playerActionsReducer } from './src/js/data/reducers';

const logger = createLogger({
    collapsed: true
});
const store = createStore(
    playerActionsReducer,
    gameStateReducer,
    applyMiddleware(thunk, logger)
);

import 'bootstrap/scss/bootstrap.scss';
import './src/sass/styles.scss';

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
        </Router>
    </Provider>
), document.getElementById('root'));
