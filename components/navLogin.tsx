import {
    Avatar,
    Flex,
    HStack,
    Icon,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { MouseEventHandler } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut as LogoutIcon } from 'react-icons/io5';
import NavButton from './navButton';

const NavLogin = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        router.push('/user/login');
    };

    const userName = session?.user?.name as string;
    const userAvatar = session?.user?.image as string;

    return (
        <>
            {userName ? (
                <Popover trigger="hover">
                    <PopoverTrigger>
                        <IconButton
                            variant="ghost"
                            aria-label="user account"
                            onClick={() => router.push('/user/account')}
                            icon={<Avatar size="xs" name={userName} src={userAvatar} />}
                        />
                    </PopoverTrigger>
                    <PopoverContent w="auto">
                        <PopoverArrow />
                        <PopoverHeader>
                            <HStack>
                                <Text noOfLines={1}>{userName}</Text>
                                {/* <PopoverCloseButton position="initial" /> */}
                            </HStack>
                        </PopoverHeader>
                        <PopoverBody>
                            <Flex gap={1}>
                                <IconButton
                                    colorScheme="blue"
                                    aria-label="account"
                                    icon={<Icon as={FaUserCircle} />}
                                />
                                <IconButton
                                    colorScheme="red"
                                    aria-label="logout"
                                    onClick={() =>
                                        signOut({
                                            callbackUrl: '/'
                                        })
                                    }
                                    icon={<Icon as={LogoutIcon} />}
                                />
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            ) : (
                <NavButton
                    e2e="loginCTA"
                    icon={FaUserCircle}
                    label="Login or register"
                    handleClick={handleClick}
                />
            )}
        </>
    );
};

export default NavLogin;
