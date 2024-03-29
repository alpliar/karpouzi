import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import NavCart from '../../components/NavCart';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState) => ({
    cartCount: state.client.shop.cart.length || 0
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavCart);
