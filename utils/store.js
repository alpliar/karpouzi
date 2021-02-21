import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const initialState = {
    tick: 'init',
    postsData: [],
    productsData: []
};

// create your reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'TICK':
            return { ...state, tick: action.payload };
        case 'SET_POSTS_DATA':
            return { ...state, postsData: action.payload };
        case 'SET_PRODUCTS_DATA':
            return { ...state, productsData: action.payload };
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
