import {
    Avatar,
    Button,
    Flex,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Stack,
    Text
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IoHome, IoLogOut } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { sendToast } from '../utils/uiToast';
import Link from './link';

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
        <Popover trigger="hover">
            <PopoverTrigger>
                <Button
                    variant="ghost"
                    aria-label="user account"
                    // onClick={() => router.push('/user/account')}
                    leftIcon={<Avatar size="xs" name={userName} src={userAvatar} />}>
                    {userName}
                </Button>
            </PopoverTrigger>
            <PopoverContent w="auto" minW={40}>
                <PopoverArrow />
                {/* <PopoverHeader>
                    <HStack>
                        <PopoverCloseButton position="initial" />
                    </HStack>
                </PopoverHeader> */}
                <PopoverBody>
                    <Stack gap={0} align="center">
                        {/* <Divider /> */}
                        <Link href="/user/account" asButton>
                            <Icon as={IoHome} boxSize=".8em" mr={1} />
                            {f('menuEntryUser')}
                        </Link>
                    </Stack>
                </PopoverBody>
                <Flex as={PopoverFooter} justify="flex-end">
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
                </Flex>
            </PopoverContent>
        </Popover>
    );
};

export default NavLoginAuthenticated;
