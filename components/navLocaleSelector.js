import { Button, IconButton } from '@chakra-ui/button';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaFlag } from 'react-icons/fa';

const NavLocaleSelector = ({ compact }) => {
    const router = useRouter();
    const handleClick = () => {};

    return (
        <>
            {/* <NavButton
                icon={<FaFlag />}
                label={'Language'}
                compact={compact}
                handleClick={handleClick}
            /> */}

            <Menu>
                <MenuButton
                    as={compact === true ? IconButton : Button}
                    icon={compact === true && <FaFlag />}>
                    {compact === false && 'Language'}
                </MenuButton>
                <MenuList>
                    {router.locales.map((locale) => (
                        <MenuItem key={locale}>
                            <Link href={`/${locale}`} locale={false} alt={`Switch locale to ${locale}`}>
                                {locale}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
};

export default NavLocaleSelector;

NavLocaleSelector.propTypes = {
    locales: PropTypes.arrayOf(PropTypes.string),
    compact: PropTypes.bool
};

NavLocaleSelector.defaultProps = {
    compact: true
};
