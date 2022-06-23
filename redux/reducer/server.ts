import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerState {}

const initialState: ServerState = {};

const serverReducer = (state = initialState, action: AnyAction): ServerState => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.server };
        default:
            return state;
    }
};

export default serverReducer;
