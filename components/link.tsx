import { Button, ButtonProps } from '@chakra-ui/button';
import { Link as UiLink } from '@chakra-ui/layout';
import { chakra, ChakraProps } from '@chakra-ui/system';

import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

interface ILinkProps {
    href: string;
    alt?: string;
    locale?: string | false;
    prefetch?: boolean;
    asButton?: boolean;
    buttonProps?: ButtonProps;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

const Link: React.FC<PropsWithChildren<ILinkProps & ChakraProps>> = ({
    href,
    alt,
    children,
    locale,
    prefetch = true,
    asButton = false,
    buttonProps,
    onClick,
    ...rest
}) => {
    return (
        <NextLink legacyBehavior href={href} passHref locale={locale} prefetch={prefetch}>
            {asButton ? (
                <Button
                    as={UiLink}
                    colorScheme="green"
                    {...buttonProps}
                    onClick={onClick}
                    {...rest}>
                    {children}
                </Button>
            ) : (
                <UiLink title={alt} onClick={onClick} {...rest}>
                    {children}
                </UiLink>
            )}
        </NextLink>
    );
};

export default chakra(Link);
