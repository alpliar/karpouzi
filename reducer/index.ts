import { combineReducers } from 'redux';
import clientReducer from '../reducer/client';
import serverReducer from '../reducer/server';

const rootReducer = combineReducers({
    client: clientReducer,
    server: serverReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
