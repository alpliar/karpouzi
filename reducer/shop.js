import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_PRODUCTS_DATA,
    UPDATE_QUANTITY_CART
} from '../actions/shop';
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
            return { ...state, cart: [{ slug: action.slug, quantity: action.quantity }, ...state.cart] };
        case REMOVE_FROM_CART:
            return { ...state, cart: [...state.cart.filter((item) => item.slug !== action.slug)] };
        case UPDATE_QUANTITY_CART:
            return {
                ...state,
                cart: [
                    ...state.cart.map((item) => {
                        return item.slug !== action.slug
                            ? item
                            : {
                                  ...item,
                                  quantity: action.newQuantity
                              };
                    })
                ]
            };
        default:
            return state;
    }
};

export default reducer;
