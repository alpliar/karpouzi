import { Button, ButtonProps, IconButton, IconButtonProps } from '@chakra-ui/button';
import { Link as ChakraLink } from '@chakra-ui/layout';
import { chakra, ChakraProps } from '@chakra-ui/system';

import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

interface ILinkProps {
    href: string;
    alt?: string;
    locale?: string | false;
    prefetch?: boolean;
    asButton?: boolean;
    asIconButton?: boolean;
    buttonProps?: ButtonProps;
    iconButtonProps?: IconButtonProps;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

const Link: React.FC<PropsWithChildren<ILinkProps & ChakraProps>> = ({
    href,
    alt,
    children,
    locale,
    prefetch = true,
    asButton = false,
    asIconButton = false,
    buttonProps,
    iconButtonProps,
    onClick,
    ...rest
}) => {
    const ServerSideLink: React.FC<{ children: React.ReactElement }> = ({ children }) => (
        <NextLink legacyBehavior href={href} passHref locale={locale} prefetch={prefetch}>
            {children}
        </NextLink>
    );
    if (asIconButton) {
        return (
            <ServerSideLink>
                <IconButton
                    as={ChakraLink}
                    href={href}
                    {...(iconButtonProps ? iconButtonProps : { 'aria-label': '???' })}
                />
            </ServerSideLink>
        );
    }

    if (asButton) {
        return (
            <ServerSideLink>
                <Button
                    as={ChakraLink}
                    {...buttonProps}
                    onClick={onClick}
                    // padding={3}
                    whiteSpace="pre-wrap"
                    height="100%"
                    {...rest}>
                    {children}
                </Button>
            </ServerSideLink>
        );
    }

    return (
        <ChakraLink as={NextLink} href={href} title={alt} onClick={onClick} {...rest}>
            {children}
        </ChakraLink>
    );
};

export default chakra(Link);
