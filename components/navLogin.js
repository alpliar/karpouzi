import { Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { FaUserCircle } from 'react-icons/fa';

const NavLogin = () => {
    const router = useRouter();
    const handleClick = (event) => {
        event.preventDefault();
        router.push('/login');
    };
    return (
        <IconButton
            aria-label="Log in or register"
            colorScheme="whiteAlpha"
            variant="solid"
            icon={<Icon as={FaUserCircle} />}
            onClick={handleClick}
        />
    );
};

export default NavLogin;