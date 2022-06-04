import { Button, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IProps {
    icon: IconType;
    label: string;
    handleClick: () => void;
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
    // const lightColor = 'gray.800';
    // const darkColor = 'white';
    // const color = useColorModeValue(lightColor, darkColor);
    // useBreakPoint value is not available instantly, need a 'sm' fallback in order to prevent buttons resize on load
    const size = useBreakpointValue({ base: 'md', md: 'sm' }) || 'sm';

    if (compact === true) {
        return (
            <IconButton
                aria-label={label}
                icon={<Icon as={icon} />}
                onClick={handleClick}
                variant={variant}
                size={size}
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
                size={size}
                data-e2e={e2e}>
                {label}
            </Button>
        );
    }
};

export default NavButton;
