import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import NavLogin from '../../components/navLogin';
import { RootState } from '../reducer';

interface IProps {
    name: string;
}

const mapStateToProps = (_state: RootState): IProps => ({
    name: 'user'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogin);
