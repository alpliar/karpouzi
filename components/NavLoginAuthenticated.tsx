import { Avatar, Button, Icon, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoHome, IoLogOut } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { sendToast } from '../utils/uiToast';
import Link from './link';
import Popover from './Popover';

const NavLoginAuthenticated: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const handleSignout = () => {
        signOut({
            redirect: false,
            callbackUrl:
                router.locale !== 'en' ? `${router.locale}/${router.pathname}` : router.pathname
        }).then(() => {
            sendToast(f('loggedOutSuccessfully'), '', 'info', 5000, 'top-right');
        });
    };

    const userName = session?.user?.name as string;
    const userAvatar = session?.user?.image as string;
    return (
        <Popover
            trigger={
                <Button
                    variant="ghost"
                    aria-label="user account"
                    // onClick={() => router.push('/user/account')}
                    leftIcon={<Avatar size="xs" name={userName} src={userAvatar} />}>
                    {userName}
                </Button>
            }
            footer={
                <Link
                    fontWeight="bold"
                    onClick={(event) => {
                        event.preventDefault();
                        handleSignout();
                    }}
                    href="/api/auth/signout"
                    display="flex"
                    alignItems="center">
                    <Icon as={IoLogOut} mr={1} />
                    <Text as="span">{f('logout')}</Text>
                </Link>
            }>
            <Link href="/user/account" asButton>
                <Icon as={IoHome} boxSize=".8em" mr={1} />
                {f('menuEntryUser')}
            </Link>
        </Popover>
    );
};

export default NavLoginAuthenticated;
