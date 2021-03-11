import { SET_POSTS_DATA } from '../actions/blog';
import { HYDRATE } from 'next-redux-wrapper';
import { SET_PRODUCTS_DATA } from '../actions/shop';

const initialState = {
    posts: [],
    products: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.server };
        case SET_POSTS_DATA:
            return { ...state.blog, posts: action.posts };
        case SET_PRODUCTS_DATA:
            return { ...state, products: action.products };
        default:
            return state;
    }
};

export default reducer;
