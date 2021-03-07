import { Link, LinkBox, LinkOverlay } from "@chakra-ui/react";

const BackToHome = () => {
    return (
        <LinkBox cursor="pointer" as="span">
            Feeling lost ?{' '}
            <Link href="/" alt="go back to home">
                <LinkOverlay>Go back to home</LinkOverlay>
            </Link>
        </LinkBox>
    );
};

export default BackToHome;
