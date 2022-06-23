import { combineReducers } from 'redux';
import shopReducer from './shop';

const clientReducer = combineReducers({
    shop: shopReducer
});

export default clientReducer;
