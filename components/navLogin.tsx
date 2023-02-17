import { Avatar, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { MouseEventHandler } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from './navButton';

const NavLogin = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        router.push('/user/login');
    };

    return (
        <>
            {session?.user?.name ? (
                <Avatar
                    p={0}
                    as={Button}
                    size="sm"
                    rounded="md"
                    height={10}
                    onClick={() => router.push('/user/account')}
                    name={session.user.name}
                    src={session?.user?.image as string}
                />
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
