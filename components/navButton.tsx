import { Icon, IconProps } from '@chakra-ui/icon';
import { Button, IconButton } from '@chakra-ui/button';
import { ComponentWithAs } from '@chakra-ui/system';

import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import Link from './link';

interface IProps {
    icon: IconType | ComponentWithAs<'svg', IconProps>;
    label: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    isPrimary?: boolean;
    compact?: boolean;
    e2e?: string;
    href?: string;
}

const NavButton: React.FC<IProps> = ({
    icon,
    label,
    handleClick,
    isPrimary = false,
    compact = true,
    e2e = undefined,
    href = undefined
}) => {
    const variant = isPrimary ? 'outline' : 'ghost';

    const RenderedIcon = () => {
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
                    }}></Link>
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
                        variant
                    }}>
                    {label}
                </Link>
            );
        }
        return (
            <Button
                aria-label={label}
                leftIcon={<Icon boxSize={5} as={icon} />}
                onClick={handleClick}
                variant={variant}
                data-e2e={e2e}>
                {label}
            </Button>
        );
    }
};

export default NavButton;
