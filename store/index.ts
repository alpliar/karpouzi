import { createStore, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
import rootReducer from '../reducer/index';

const makeStore = (initialState) => {
    let store;

    const composeEnhancers =
        (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const isClient: boolean = typeof window !== 'undefined';

    if (isClient) {
        const { persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;

        const persistConfig = {
            key: 'root',
            storage
        };

        store = createStore(
            persistReducer(persistConfig, rootReducer),
            initialState,
            composeEnhancers()
        );

        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(rootReducer, initialState);
    }

    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
