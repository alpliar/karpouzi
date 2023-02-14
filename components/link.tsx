import { Link as UiLink } from '@chakra-ui/layout';
import { Button, ButtonProps } from '@chakra-ui/button';
import { chakra } from '@chakra-ui/system';

import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

interface ILinkProps {
    href: string;
    alt?: string;
    locale?: string | false;
    prefetch?: boolean;
    asButton?: boolean;
    buttonProps?: ButtonProps[];
}

const Link: React.FC<PropsWithChildren<ILinkProps>> = ({
    href,
    alt,
    children,
    locale,
    prefetch = true,
    asButton = false,
    ...buttonProps
}) => {
    return (
        <NextLink legacyBehavior href={href} passHref locale={locale} prefetch={prefetch}>
            {asButton ? (
                <Button as={UiLink} {...buttonProps}>
                    {children}
                </Button>
            ) : (
                <UiLink title={alt}>{children}</UiLink>
            )}
        </NextLink>
    );
};

export default chakra(Link);
