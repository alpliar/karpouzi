import { FaHamburger } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import NavButton from './navButton';

interface IProps {
    handleClick: () => void;
}

const NavBurgerMenu: React.FC<IProps> = ({ handleClick }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <NavButton
            e2e="menuCTA"
            icon={FaHamburger}
            label={f('openMenu')}
            handleClick={handleClick}
            isPrimary={true}
        />
    );
};

export default NavBurgerMenu;
