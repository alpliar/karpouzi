import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { addToCart, updateQuantityCart } from '../actions/shop';
import AddToCart from '../components/addToCart';
import { RootState } from '../reducer';
import { getQuantityInCartBySlug } from '../utils/shop';

interface IOwnProps {
    slug: string;
    quantity: number;
}

export interface ICartItem {
    slug: string;
    quantity: number;
}

const mapStateToProps = (state: RootState, ownProps: IOwnProps) => ({
    cart: state.client.cart,
    inCart: getQuantityInCartBySlug(ownProps.slug, state.client.cart),
    slug: ownProps.slug,
    quantity: ownProps.quantity
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    addToCart: (slug: string, quantity: number, cart: Array<ICartItem>) => {
        const existingItem: ICartItem | undefined = cart.find(
            (item: ICartItem): boolean => item.slug === slug
        );

        if (existingItem) {
            const newQuantity: number = existingItem.quantity + quantity;
            dispatch(updateQuantityCart(slug, newQuantity));
        } else {
            dispatch(addToCart(slug, quantity));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
