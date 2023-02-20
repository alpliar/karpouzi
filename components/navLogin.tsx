import { Box, Icon } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import Link from './link';
import NavLoginAuthenticated from './NavLoginAuthenticated';
import Popover from './Popover';

const NavLogin = () => {
    const { data: session } = useSession();
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const isAuthenticated = !!session?.user;

    const handleClickLogin = () => {
        signIn();
    };

    return (
        <>
            {isAuthenticated ? (
                <NavLoginAuthenticated />
            ) : (
                // <NavButton
                //     e2e="loginCTA"
                //     icon={FaUserCircle}
                //     label="Login or register"
                //     handleClick={handleClick}
                // />

                <Popover
                    trigger={
                        <Box>
                            <Link
                                href="/user/account"
                                asButton
                                buttonProps={{
                                    variant: 'ghost',
                                    color: 'currentcolor',
                                    // leftIcon: (
                                    //     <Avatar
                                    //         size="xs"
                                    //         name={f('menuEntryUser')}
                                    //         src={undefined}
                                    //         _hover={{
                                    //             textDecoration: 'none !important'
                                    //         }}
                                    //     />
                                    // )
                                    leftIcon: <Icon boxSize={6} as={FaUserCircle} />
                                }}
                                aria-label="user account"
                                // onClick={(event) => {
                                //     event.preventDefault();
                                //     // Do not follow link if javascript is enabled, since a popover is opened instead
                                // }}
                            >
                                {f('menuEntryUser')}
                            </Link>
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
                        {f('menuEntryLogin')}
                    </Link>
                </Popover>
            )}
        </>
    );
};

export default NavLogin;
