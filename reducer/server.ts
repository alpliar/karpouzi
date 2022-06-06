import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { SET_POSTS_DATA } from '../actions/blog';

export interface Post {
    id: string;
    title: string;
    date: string;
}

export interface ServerState {
    posts: Array<Post>;
}

const initialState: ServerState = {
    posts: []
};

const serverReducer = (state = initialState, action: AnyAction): ServerState => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.server };
        case SET_POSTS_DATA:
            return { ...state, posts: action.posts };
        default:
            return state;
    }
};

export default serverReducer;
