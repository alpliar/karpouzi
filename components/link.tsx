import { chakra, Link as UiLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

interface ILinkProps {
    href: string;
    alt: string;
    locale?: string | false;
}

const Link: React.FC<PropsWithChildren<ILinkProps>> = ({ href, alt, children, locale }) => {
    return (
        <NextLink href={href} passHref locale={locale}>
            <UiLink title={alt}>{children}</UiLink>
        </NextLink>
    );
};

export default chakra(Link);
