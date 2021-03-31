import { Dispatch } from 'react';
import { connect } from 'react-redux';
import NavLogin from '../components/navLogin';
import { rootState } from '../reducer';

interface IProps {
    name: string
}

const mapStateToProps = (state: rootState): IProps => ({
    name: 'user'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogin);
