import { AnyAction } from 'redux';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY_CART } from '../actions/shop';

interface CartRow {
    slug: string,
    quantity: number
};

interface ClientState {
    cart: CartRow[]
};

const initialState = {
    cart: []
};

const reducer = (state = initialState, action : AnyAction) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [{ slug: action.slug, quantity: action.quantity }, ...state.cart]
            };
        }
        case REMOVE_FROM_CART:
            return { ...state, cart: [...state.cart.filter((item) => item.slug !== action.slug)] };
        case UPDATE_QUANTITY_CART:
            return {
                ...state,
                cart: [
                    ...state.cart.map((item) => {
                        return item.slug !== action.slug
                            ? item
                            : {
                                  ...item,
                                  quantity: action.newQuantity
                              };
                    })
                ]
            };
        default:
            return state;
    }
};

export default reducer;