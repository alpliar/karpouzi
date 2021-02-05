import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from './link';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import HeaderLogo from './header-logo';

const MenuItems = ({ children }) => (
    <Text mt={{ base: 0, md: 0 }} mr={6} display={{ base: 'inline', sm: 'inline' }}>
        {children}
    </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = ({ siteTitle }) => {
    const [show, setShow] = useState(false);
    const handleToggle = () => {
        console.log(show);
        setShow(!show);
    };

    return (
        <Flex as="nav" bg="teal.600" color="white">
            <Flex
                align={{ base: 'auto', md: 'center' }}
                justify="space-between"
                wrap="wrap"
                maxW={{ md: '4xl' }}
                w="100%"
                p={4}
                m={{ base: 0, md: 'auto' }}>
                <Flex align="center" mr={5}>
                    <HeaderLogo siteTitle={siteTitle} />
                </Flex>

                <Box
                    bg="white"
                    _hover={{ opacity: '0.9' }}
                    borderRadius="full"
                    p={3}
                    display={{ base: 'block', md: 'none' }}
                    onClick={handleToggle}>
                    <svg
                        fill="teal.600"
                        width="12px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </Box>

                <Box
                    display={{ base: show ? 'block' : 'inline', sm: 'flex' }}
                    w={{ base: 'full', md: 'auto' }}
                    mt={{ base: show ? 4 : 0, md: 0 }}
                    textAlign={{ base: 'center', md: 'inherit' }}
                    alignItems="center"
                    justifyContent="center"
                    flexGrow={1}
                    transition="all 0.2s ease-in">
                    <Box
                        display={{ base: show ? 'flex' : 'none', md: 'block' }}
                        minW={{ base: 'full', sm: 'auto', md: 'auto' }}
                        alignItems={{ base: 'center', md: 'left' }}
                        justifyContent={{ base: 'center', md: 'flex-start' }}
                        transition="all 0.2s ease-in"
                        flexWrap="wrap"
                        flexGrow={1}>
                        <MenuItems>Docs</MenuItems>
                        <MenuItems>Examples</MenuItems>
                        <MenuItems>
                            <Link href="/blog" alt="go to blog page">
                                Blog
                            </Link>
                        </MenuItems>
                    </Box>

                    <Box
                        display={{ base: show ? 'block' : 'none', md: 'block' }}
                        width={{ base: 'full', sm: 'auto', md: 'auto' }}
                        mt={{ base: 4, sm: 0 }}
                        transition="all 0.2s ease-in">
                        <Button bg="transparent" border="1px">
                            <Link href="/login" alt="go to login page">
                                Create account
                            </Link>
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Header;

MenuItems.propTypes = {
    children: PropTypes.node
};

Header.propTypes = {
    siteTitle: PropTypes.string
};
