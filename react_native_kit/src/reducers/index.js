'use strict';
import { combineReducers } from 'redux';
import nav from './navReducers'
import nuan from './nuanReducer'
import listPool from './listPoolReducer'

const rootReducer = combineReducers({
    nav,
    nuan,
    listPool
});

export default rootReducer;
