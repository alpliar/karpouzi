import { SET_POSTS_DATA } from '../utils/constants/actions';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    postsData: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.blog };
        case SET_POSTS_DATA:
            return { ...state.blog, postsData: action.payload };
        default:
            return state;
    }
};

export default reducer;
