import { Avatar, Box, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoHome, IoLogOut } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { sendToast } from '../utils/uiToast';
import Link from './Link';
import NavButton from './NavButton';
import Popover from './Popover';

const NavLoginAuthenticated: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { formatMessage } = useIntl();

    const handleSignout = () => {
        signOut({
            redirect: false,
            callbackUrl:
                router.locale !== 'en' ? `${router.locale}/${router.pathname}` : router.pathname
        })
            .catch((error) => {
                sendToast(
                    formatMessage({ id: 'somethingWentWrong' }),
                    `${formatMessage({ id: 'newsletterError' })} ${error.toString()})`,
                    'error',
                    3000,
                    'top'
                );
                return;
            })
            .finally(() => {
                sendToast(
                    formatMessage({ id: 'loggedOutSuccessfully' }),
                    formatMessage({ id: 'logoutFeatures' }),
                    'success',
                    5000,
                    'top'
                );
            });
    };

    const userName = session?.user?.name as string;
    const userAvatar = session?.user?.image as string;

    const compact = useBreakpointValue({ base: true, md: false });
    return (
        <Popover
            trigger={
                <Box>
                    <NavButton
                        href="/user/account"
                        e2e="loggedInCTA"
                        customIconElement={<Avatar boxSize={5} name={userName} src={userAvatar} />}
                        label={userName}
                        compact={compact}
                        handleClick={() => {
                            // test
                        }}
                    />
                </Box>
            }
            footer={
                <Link
                    fontWeight="bold"
                    onClick={(event) => {
                        event.preventDefault();
                        handleSignout();
                    }}
                    // href="/api/auth/signout"
                    href="#"
                    display="flex"
                    alignItems="center">
                    <Icon as={IoLogOut} mr={1} />
                    <Text as="span">{formatMessage({ id: 'logout' })}</Text>
                </Link>
            }>
            <Link
                href="/user/account"
                asButton
                buttonProps={{
                    colorScheme: 'green'
                }}>
                <Icon as={IoHome} boxSize=".8em" mr={1} />
                {formatMessage({ id: 'menuEntryUser' })}
            </Link>
        </Popover>
    );
};

export default NavLoginAuthenticated;
