import { ShopAction } from '../../actions/shop.actions';
export interface CartRow {
    slug: string;
    quantity: number;
}
export interface ShopState {
    cart: Array<CartRow>;
}

export const initialState: ShopState = {
    cart: []
};

const shopReducer = (state = initialState, action: ShopAction) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            return {
                ...state,
                cart: [{ slug: action.slug, quantity: action.quantity }, ...state.cart]
            };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: [...state.cart.filter((item) => item.slug !== action.slug)] };
        case 'UPDATE_QUANTITY_CART':
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

export default shopReducer;
