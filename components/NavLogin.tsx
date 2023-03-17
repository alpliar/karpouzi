import { Box, Icon, useBreakpointValue } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import Link from './Link';
import NavButton from './NavButton';
import NavLoginAuthenticated from './NavLoginAuthenticated';
import Popover from './Popover';

const NavLogin = () => {
    const { data: session } = useSession();
    const { formatMessage } = useIntl();

    const isAuthenticated = !!session?.user;

    const handleClickLogin = () => {
        signIn();
    };

    const compact = useBreakpointValue({ base: true, md: false });

    return (
        <>
            {isAuthenticated ? (
                <NavLoginAuthenticated />
            ) : (
                <Popover
                    trigger={
                        <Box>
                            <NavButton
                                href="/user/account"
                                e2e="loginCTA"
                                icon={FaUserCircle}
                                label={formatMessage({ id: 'menuEntryUser' })}
                                compact={compact}
                                handleClick={() => {
                                    // test
                                }}
                            />
                        </Box>
                    }>
                    <Link
                        href="/user/login"
                        asButton
                        onClick={(event) => {
                            event.preventDefault();
                            handleClickLogin();
                        }}>
                        <Icon as={IoLogIn} boxSize=".8em" mr={1} />
                        {formatMessage({ id: 'menuEntryLogin' })}
                    </Link>
                </Popover>
            )}
        </>
    );
};

export default NavLogin;
