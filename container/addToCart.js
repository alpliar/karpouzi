import { connect } from 'react-redux';
import { addToCart, updateQuantityCart } from '../actions/shop';
import AddToCart from '../components/addToCart';

const mapStateToProps = (state, ownProps) => ({
    cart: state.shop.cart,
    slug: ownProps.slug,
    quantity: ownProps.quantity
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => ({
    addToCart: (slug, quantity, cart) => {
        const existingItem = cart.length && cart.find((item) => item.slug === slug);

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            dispatch(updateQuantityCart(slug, newQuantity));
        } else {
            dispatch(addToCart(slug, quantity));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
