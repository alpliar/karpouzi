import { HamburgerIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import PropType from 'prop-types';
import NavButton from './navButton';

const NavBurgerMenu = ({ handleClick }) => {
    const icon = <Icon as={HamburgerIcon} />;

    return <NavButton icon={icon} label="Open menu" handleClick={handleClick} isPrimary={true} />;
};

export default NavBurgerMenu;

NavBurgerMenu.propTypes = {
    handleClick: PropType.func.isRequired
};
