import { LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Link from 'next/link';

const BackToHome = () => {
    return (
        <LinkBox cursor="pointer" as="aside">
            <Text as="span" fontStyle="italic">
                Feeling lost ?{' '}
            </Text>
            <Link href="/" alt="go back to home">
                <LinkOverlay>Go back to home</LinkOverlay>
            </Link>
        </LinkBox>
    );
};

export default BackToHome;
