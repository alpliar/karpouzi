import { createStore, compose, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import shop from './shop';
import blog from './blog';

// create your reducer
const reducer = combineReducers({
    shop,
    blog
});

const initialState = { shop, blog };
//process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// create a makeStore function
const makeStore = (state = initialState, action) => {
    // if (action && action.type && action.type === HYDRATE) {
    //     return { ...state, ...action.payload };
    // } else {
        return createStore(reducer, state, composeEnhancers());
    // }
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
