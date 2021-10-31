import { chakra, Link as UiLink } from '@chakra-ui/react';
import NextLink from 'next/link';

interface LinkProps {
    href: string;
    alt: string;
    locale?: string | false;
    children;
}

const Link = ({ href, alt, children, locale }: LinkProps) => {
    return (
        <NextLink href={href} passHref locale={locale}>
            <UiLink alt={alt}>{children}</UiLink>
        </NextLink>
    );
};

export default chakra(Link);
