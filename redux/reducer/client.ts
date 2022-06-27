import { combineReducers } from 'redux';
import shopReducer from './shop.reducer';

const clientReducer = combineReducers({
    shop: shopReducer
});

export default clientReducer;
