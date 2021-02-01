/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { PropTypes } from 'prop-types';
import UiHomeLogo from './UiHomeLogo';
import { Box, Container, Flex, Link as UiLink } from 'theme-ui';

const Header = ({ siteTitle }) => {
    return (
        <Container as="header" p={4} bg="primary" color="onPrimary">
            <Flex as="nav" aria-label="Global">
                <Box>
                    <UiHomeLogo siteTitle={siteTitle} />
                </Box>
                <Flex
                    sx={{
                        flex: '1 1 auto',
                        justifyContent: 'flex-end',
                        flexWrap: 'wrap'
                    }}>
                    <UiLink href="#" sx={{ marginRight: '1em' }} color="onPrimary">
                        Product
                    </UiLink>

                    <UiLink href="#" sx={{ marginRight: '1em' }} color="onPrimary">
                        Features
                    </UiLink>

                    <UiLink href="#" sx={{ marginRight: '1em' }} color="onPrimary">
                        Company
                    </UiLink>

                    <Link href="/login">
                        <UiLink href="/login" sx={{ marginRight: '1em' }} color="onPrimary">
                            Log in
                        </UiLink>
                    </Link>
                </Flex>
            </Flex>
        </Container>
    );
};

export default Header;

Header.propTypes = {
    siteTitle: PropTypes.string
};
