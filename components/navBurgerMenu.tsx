import { HamburgerIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import PropType from 'prop-types';
import { useIntl } from 'react-intl';
import NavButton from './navButton';

const NavBurgerMenu = ({ handleClick }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const icon = <Icon as={HamburgerIcon} />;

    return (
        <NavButton icon={icon} label={f('openMenu')} handleClick={handleClick} isPrimary={true} />
    );
};

export default NavBurgerMenu;

NavBurgerMenu.propTypes = {
    handleClick: PropType.func.isRequired
};
