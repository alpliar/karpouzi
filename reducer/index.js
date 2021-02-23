import { createStore, compose, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import shop from './shop';
import blog from './blog';

const reducer = combineReducers({
    shop,
    blog
});

const initialState = { shop, blog };

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION &&
        window.__REDUX_DEVTOOLS_EXTENSION({ trace: true, traceLimit: 25 })) ||
    compose;

const makeStore = (state = initialState) => {
    return createStore(reducer, state, composeEnhancers());
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
