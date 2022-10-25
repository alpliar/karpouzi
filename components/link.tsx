import { Button, ButtonProps, chakra, Link as UiLink } from '@chakra-ui/react';
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
        <NextLink href={href} passHref locale={locale} prefetch={prefetch}>
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
