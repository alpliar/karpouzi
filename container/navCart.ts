import { Dispatch } from 'react';
import { connect } from 'react-redux';
import NavCart from '../components/navCart';
import { rootState } from '../reducer';

const mapStateToProps = (state: rootState) => ({
    cartCount: state.client.cart.length || 0
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavCart);
