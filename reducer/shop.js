import { SET_PRODUCTS_DATA } from '../actions/shop';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    productsData: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.shop };
        case SET_PRODUCTS_DATA:
            return { ...state.shop, productsData: action.payload };
        default:
            return state;
    }
};

export default reducer;
