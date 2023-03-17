import { Icon, IconProps } from '@chakra-ui/icon';
import { Button, IconButton } from '@chakra-ui/button';
import { ComponentWithAs } from '@chakra-ui/system';

import React, { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import Link from './Link';
import { VisuallyHidden } from '@chakra-ui/react';

interface NavButtonProps {
    icon?: IconType | ComponentWithAs<'svg', IconProps>;
    customIconElement?: React.ReactElement;
    label: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    isPrimary?: boolean;
    compact?: boolean;
    e2e?: string;
    href?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
    icon,
    label,
    handleClick,
    isPrimary = false,
    compact = true,
    e2e = undefined,
    href = undefined,
    customIconElement = undefined
}) => {
    const variant = isPrimary ? 'outline' : 'ghost';

    const RenderedIcon = () => {
        if (customIconElement) return customIconElement;
        return <Icon as={icon} boxSize={5} />;
    };

    if (compact === true) {
        if (href) {
            return (
                <Link
                    href={href}
                    asIconButton
                    iconButtonProps={{
                        icon: <RenderedIcon />,
                        'aria-label': label,
                        variant
                    }}>
                    <VisuallyHidden>{label}</VisuallyHidden>
                </Link>
            );
        }
        return (
            <IconButton
                aria-label={label}
                icon={<RenderedIcon />}
                onClick={handleClick}
                variant={variant}
                data-e2e={e2e}
            />
        );
    } else {
        if (href) {
            return (
                <Link
                    href={href}
                    asButton
                    buttonProps={{
                        leftIcon: <RenderedIcon />,
                        variant,
                        padding: 2.5
                    }}>
                    {label}
                </Link>
            );
        }
        return (
            <Button
                aria-label={label}
                leftIcon={<RenderedIcon />}
                onClick={handleClick}
                variant={variant}
                data-e2e={e2e}>
                {label}
            </Button>
        );
    }
};

export default NavButton;
