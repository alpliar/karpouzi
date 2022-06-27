import { addToCart, removeFromCart, updateQuantityCart } from '../actions/shop';
import reducer, { ShopState } from '../redux/reducer/shop';

const initialState: ShopState = { cart: [] };

describe('shop reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initialState, { type: '' })).toEqual(initialState);
    });
    it('should add a product to cart', () => {
        expect(reducer(initialState, addToCart('test', 6))).toEqual({
            ...initialState,
            cart: [
                {
                    slug: 'test',
                    quantity: 6
                }
            ]
        });
    });
    it('should update quantity', () => {
        const stateBefore = {
            ...initialState,
            cart: [
                {
                    slug: 'test',
                    quantity: 6
                }
            ]
        };
        const stateAfter = {
            cart: [
                {
                    slug: 'test',
                    quantity: 8
                }
            ]
        };

        expect(reducer(stateBefore, updateQuantityCart('test', 8))).toEqual(stateAfter);
    });
    it('should remove product from cart', () => {
        const stateBefore = {
            ...initialState,
            cart: [
                {
                    slug: 'test',
                    quantity: 1
                }
            ]
        };
        const stateAfter = {
            ...stateBefore,
            cart: []
        };

        expect(reducer(stateBefore, removeFromCart('test'))).toEqual(stateAfter);
    });
});
