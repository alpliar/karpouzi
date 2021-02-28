import { createStore, compose, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import shop from './shop';
import blog from './blog';

// const isClient = typeof window !== 'undefined';

const rootReducer = combineReducers({
    shop,
    blog
});

export default rootReducer;

// const initialState = { shop, blog };

// const composeEnhancers =
//     (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const makeStore = (state = initialState) => {
//     return createStore(reducer, state, composeEnhancers());
// };

// export an assembled wrapper
// export const wrapper = createWrapper(makeStore, { debug: false });
