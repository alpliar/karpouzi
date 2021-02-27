import { ADD_TO_CART, SET_PRODUCTS_DATA } from '../actions/shop';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    cart: [],
    productsData: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.shop };
        case SET_PRODUCTS_DATA:
            return { ...state, productsData: action.payload };
        case ADD_TO_CART:
            return { ...state, cart: [action.payload, ...state.cart] };
        default:
            return state;
    }
};

export default reducer;
