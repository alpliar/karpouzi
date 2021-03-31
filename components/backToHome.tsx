import { LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Link from 'next/link';

const BackToHome = () => {
    return (
        <LinkBox as="aside">
            <Text as="span" fontStyle="italic">
                Feeling lost ?{' '}
            </Text>
            <Link href="/" passHref>
                <LinkOverlay alt="go back to home">Go back to home</LinkOverlay>
            </Link>
        </LinkBox>
    );
};

export default BackToHome;
