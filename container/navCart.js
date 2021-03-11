import { connect } from 'react-redux';
import NavCart from '../components/navCart';

const mapStateToProps = (state) => ({
    cartCount: state.client.cart.length || 0
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavCart);
