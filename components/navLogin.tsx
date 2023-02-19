import { Avatar, Button, Icon } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
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
                        <Button
                            variant="ghost"
                            aria-label="user account"
                            // onClick={() => router.push('/user/account')}
                            leftIcon={
                                <Avatar size="xs" name={f('menuEntryUser')} src={undefined} />
                            }>
                            {f('menuEntryUser')}
                        </Button>
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
