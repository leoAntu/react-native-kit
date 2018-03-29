'use strict';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import logger from 'redux-logger';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const reduxMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav,);

const middlewares = [];

middlewares.push(thunk)
middlewares.push(reduxMiddleware)

if (__DEV__) {
    middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducers, initialState);
    return store;
}
