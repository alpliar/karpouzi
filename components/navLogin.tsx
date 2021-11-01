import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { FaUserCircle } from 'react-icons/fa';
import NavButton from './navButton';

const NavLogin = () => {
    const router = useRouter();
    const handleClick = (event) => {
        event.preventDefault();
        router.push('/login');
    };
    const icon = <Icon as={FaUserCircle} />;

    return (
        <NavButton e2e="loginCTA" icon={icon} label="Login or register" handleClick={handleClick} />
    );
};

export default NavLogin;
