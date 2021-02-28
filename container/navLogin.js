import { connect } from 'react-redux';
import NavLogin from '../components/navLogin';

const mapStateToProps = (state) => ({
    name: 'user'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogin);
