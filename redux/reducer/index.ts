import { combineReducers } from 'redux';
import clientReducer from './client';
import serverReducer from './server';

const rootReducer = combineReducers({
    client: clientReducer,
    server: serverReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
