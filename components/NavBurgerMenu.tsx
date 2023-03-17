import { HamburgerIcon } from '@chakra-ui/icons';
import { useIntl } from 'react-intl';
import NavButton from './NavButton';

interface IProps {
    handleClick: () => void;
}

const NavBurgerMenu: React.FC<IProps> = ({ handleClick }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <NavButton
            e2e="menuCTA"
            icon={HamburgerIcon}
            label={f('openMenu')}
            handleClick={handleClick}
            isPrimary={true}
        />
    );
};

export default NavBurgerMenu;
