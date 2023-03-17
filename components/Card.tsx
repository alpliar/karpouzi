import { Box, BoxProps, SpacerProps } from '@chakra-ui/react';
import { BASE_TRANSITION } from '../constants/ui/transitions';

interface ICardProps {
    children: React.ReactNode;
    padding?: SpacerProps['p'];
    fullHeight?: boolean;
    hoverBg?: string;
    rest?: BoxProps;
}

export const cardPadding = { base: 2, sm: 4, md: 6 };

const Card: React.FC<ICardProps> = ({ children, fullHeight = false, hoverBg, ...rest }) => {
    return (
        <Box
            _hover={{
                boxShadow: 'xl',
                bg: hoverBg
                // transform: 'skewY(-0.1deg)'
            }}
            backgroundColor="surface"
            boxShadow="lg"
            height={fullHeight ? '100%' : undefined}
            overflow={'hidden'}
            padding={cardPadding}
            rounded="md"
            transition={BASE_TRANSITION}
            width="full"
            {...rest}>
            {children}
        </Box>
    );
};

export default Card;
