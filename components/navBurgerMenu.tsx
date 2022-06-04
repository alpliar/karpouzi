import { HamburgerIcon, Icon } from '@chakra-ui/icons';
import PropType from 'prop-types';
import { useIntl } from 'react-intl';
import NavButton from './navButton';

const NavBurgerMenu = ({ handleClick }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const icon = <Icon as={HamburgerIcon} />;

    return (
        <NavButton
            e2e="menuCTA"
            icon={icon}
            label={f('openMenu')}
            handleClick={handleClick}
            isPrimary={true}
        />
    );
};

export default NavBurgerMenu;

NavBurgerMenu.propTypes = {
    handleClick: PropType.func.isRequired
};
