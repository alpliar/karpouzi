import { connect } from 'react-redux';
import NavLocaleSelector from '../components/navLocaleSelector';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLocaleSelector);
