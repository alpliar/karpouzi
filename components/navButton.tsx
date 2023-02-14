import { Icon, IconProps } from '@chakra-ui/icon';
import { Button, IconButton } from '@chakra-ui/button';
import { ComponentWithAs } from '@chakra-ui/system';

import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

interface IProps {
    icon: IconType | ComponentWithAs<'svg', IconProps>;
    label: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    isPrimary?: boolean;
    compact?: boolean;
    e2e?: string;
}

const NavButton: React.FC<IProps> = ({
    icon,
    label,
    handleClick,
    isPrimary = false,
    compact = true,
    e2e = undefined
}) => {
    const variant = isPrimary ? 'outline' : 'ghost';

    if (compact === true) {
        return (
            <IconButton
                aria-label={label}
                icon={<Icon as={icon} />}
                onClick={handleClick}
                variant={variant}
                data-e2e={e2e}
            />
        );
    } else {
        return (
            <Button
                aria-label={label}
                leftIcon={<Icon as={icon} />}
                onClick={handleClick}
                variant={variant}
                data-e2e={e2e}>
                {label}
            </Button>
        );
    }
};

export default NavButton;
