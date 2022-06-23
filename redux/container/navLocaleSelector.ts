import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import NavLocaleSelector, { INavLocaleSelectorProps } from '../../components/navLocaleSelector';
import { RootState } from '../reducer';

const mapStateToProps = (state: RootState, ownProps: INavLocaleSelectorProps) => {
    return {
        compact: ownProps.compact
    };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLocaleSelector);
