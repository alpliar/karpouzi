import { Dispatch } from 'react';
import { connect } from 'react-redux';
import NavLogo from '../components/navLogo';
import { rootState } from '../reducer';

interface IProps {
    siteEmoji: string;
    siteEmojiLabel: string;
}

const mapStateToProps = (state: rootState): IProps => ({
    siteEmoji: '🍉',
    siteEmojiLabel: 'Watermelon'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogo);
