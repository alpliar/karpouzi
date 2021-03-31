import { combineReducers } from 'redux';
import client from './client';
import server from './server';
import {ClientState} from '../reducer/client';
import {ServerState} from '../reducer/server';

export interface rootState {
    client: ClientState,
    server: ServerState
}

const rootReducer = combineReducers({
    client,
    server
});

export default rootReducer;
