import { useColorModeValue } from '@chakra-ui/color-mode';
import { Icon, HamburgerIcon } from '@chakra-ui/icons';
import PropType from 'prop-types';
import { useIntl } from 'react-intl';
import NavButton from './navButton';

const NavBurgerMenu = ({ handleClick }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const icon = <Icon as={HamburgerIcon} />;

    const lightColor = 'gray.800';
    const darkColor = 'white';

    const isPrimary = true;
    const lightColorScheme = isPrimary ? 'red' : 'white';
    const darkColorScheme = isPrimary ? 'red' : 'white';

    const colorScheme = useColorModeValue(lightColorScheme, darkColorScheme);

    const color = useColorModeValue(lightColor, darkColor);

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
