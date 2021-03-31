import { SET_POSTS_DATA } from '../actions/blog';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

interface Post {
    id: string
    title: string
    date: string
};

interface BlogState {
    postsData: Post[]
};

const initialState: BlogState = {
    postsData: []
};

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.blog };
        case SET_POSTS_DATA:
            return { ...state, postsData: action.payload };
        default:
            return state;
    }
};

export default reducer;
