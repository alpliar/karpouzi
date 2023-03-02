import { Box, SpacerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { BASE_TRANSITION } from '../constants/ui/transitions';

interface ICardProps {
    padding?: SpacerProps['p'];
    fullHeight?: boolean;
    hoverBg?: string;
}

export const cardPadding = { base: 2, sm: 4, md: 6 };

const Card: React.FC<PropsWithChildren<ICardProps>> = ({
    children,
    padding = cardPadding,
    fullHeight = false,
    hoverBg
}) => {
    return (
        <Box
            w={'full'}
            backgroundColor="surface"
            boxShadow={'lg'}
            rounded={{ base: 'md' }}
            p={padding}
            h={fullHeight ? '100%' : undefined}
            overflow={'hidden'}
            _hover={{
                boxShadow: 'xl',
                bg: hoverBg
                // transform: 'skewY(-0.1deg)'
            }}
            transition={BASE_TRANSITION}>
            {children}
        </Box>
    );
};

export default Card;
