import { connect } from 'react-redux';
import NavLogo from '../components/navLogo';

const mapStateToProps = (state) => ({
    siteEmoji: '🍉',
    siteEmojiLabel: 'Watermelon',
    siteName: 'Karpouzi'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogo);
