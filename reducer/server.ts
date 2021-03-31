import { SET_POSTS_DATA } from '../actions/blog';
import { HYDRATE } from 'next-redux-wrapper';
import { SET_PRODUCTS_DATA } from '../actions/shop';
import { AnyAction } from 'redux';

interface Post {
    id: string
    title: string
    date: string
};

interface Product {
    slug: string
    title: string
    date: string,
    price: string,
    rating: number,
    reviewCount: number,
    isNew: boolean,
    imageUrl: string
};

interface ServerState {
    posts: Post[],
    products: Product[]
}

const initialState: ServerState = {
    posts: [],
    products: []
};

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.server };
        case SET_POSTS_DATA:
            return { ...state, posts: action.posts };
        case SET_PRODUCTS_DATA:
            return { ...state, products: action.products };
        default:
            return state;
    }
};

export default reducer;
