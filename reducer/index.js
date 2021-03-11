import { combineReducers } from 'redux';
import client from './client';
import server from './server';

const rootReducer = combineReducers({
    client,
    server
});

export default rootReducer;
