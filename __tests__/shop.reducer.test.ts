import reducer, { ShopState } from '../redux/reducer/shop';

const initialState: ShopState = { cart: [] };

describe('shop reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(initialState, { type: '' })).toEqual(initialState);
    });
});
