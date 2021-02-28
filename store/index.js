import { createStore, compose, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

// import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

//import rootSaga from './saga';
import rootReducer from '../reducer/index';

const makeStore = (initialState) => {
    let store;

    // const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers =
        (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const isClient = typeof window !== 'undefined';

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
            //applyMiddleware(sagaMiddleware)
        );

        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(rootReducer, initialState /*, applyMiddleware(sagaMiddleware) */);
    }

    //   store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
