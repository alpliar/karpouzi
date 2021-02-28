import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

const NavLogin = () => {
    const router = useRouter();
    const handleClick = (event) => {
        event.preventDefault();
        router.push('/');
    };
    return (
        <Button
            as="h1"
            size="lg"
            colorScheme="teal"
            variant="solid"
            aria-label="Go to homepage"
            onClick={handleClick}>
            <span role="img" aria-label="Watermelon">
                🍉
            </span>
            Karpouzi
        </Button>
    );
};

export default NavLogin;
// import PropTypes from 'prop-types';
// import { Heading } from '@chakra-ui/react';
// import Link from './link';

// const NavLogo = ({ siteTitle }) => {
//     return (
//         <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
//             <Link href="/" alt="go to home">
//                 <span role="img" aria-label="Watermelon">
//                     🍉
//                 </span>
//                 {siteTitle}
//             </Link>
//         </Heading>
//     );
// };
// export default NavLogo;

// NavLogo.propTypes = {
//     siteTitle: PropTypes.string.isRequired
// };
