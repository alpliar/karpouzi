import { VStack } from '@chakra-ui/react';
import NavDrawerBodyItem from './navDrawerBodyItem';

const NavDrawerBody = () => {
    return (
        <VStack spacing="2">
            <NavDrawerBodyItem href="/blog" alt="go to blog page" text="Blog" />
            <NavDrawerBodyItem href="/shop" alt="go to shop page" text="Shop" />
        </VStack>
    );
};

export default NavDrawerBody;

NavDrawerBody.propTypes = {};
