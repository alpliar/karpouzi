import { Dispatch } from 'react';
import { connect } from 'react-redux';
import NavLocaleSelector from '../components/navLocaleSelector';
import { rootState } from '../reducer';

interface IProps {
    compact?: boolean
}

interface IOwnProps {
    compact?: boolean
}

const mapStateToProps = (state: rootState, ownProps: IOwnProps) : IProps => {
    return {
        compact: ownProps.compact
    };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLocaleSelector);
