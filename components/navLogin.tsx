import { useRouter } from 'next/dist/client/router';
import { MouseEventHandler } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from './navButton';

const NavLogin = () => {
    const router = useRouter();
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        router.push('/user/login');
    };

    return (
        <NavButton
            e2e="loginCTA"
            icon={FaUserCircle}
            label="Login or register"
            handleClick={handleClick}
        />
    );
};

export default NavLogin;
