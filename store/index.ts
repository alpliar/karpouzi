import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer';

// const middlewares = [aMiddleware];

const bindMiddlewares = (middlewares: Array<Middleware>) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middlewares));
    }
    return applyMiddleware(...middlewares);
};

// const makeStore = () => createStore(rootReducer, bindMiddlewares(middlewares));
const makeStore = () => createStore(rootReducer, bindMiddlewares([]));

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });
