import { useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { MouseEventHandler } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from './navButton';
import NavLoginAuthenticated from './NavLoginAuthenticated';

const NavLogin = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        router.push('/user/login');
    };

    const isAuthenticated = !!session?.user;

    // alert(isAuthenticated);

    return (
        <>
            {isAuthenticated ? (
                <NavLoginAuthenticated />
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
