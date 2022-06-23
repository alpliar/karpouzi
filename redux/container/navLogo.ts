import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import NavLogo from '../../components/navLogo';
import { RootState } from '../reducer';

interface IProps {
    siteEmoji: string;
    siteEmojiLabel: string;
}

const mapStateToProps = (_state: RootState): IProps => ({
    siteEmoji: '🍉',
    siteEmojiLabel: 'Watermelon'
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (_dispatch: Dispatch<AnyAction>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavLogo);
