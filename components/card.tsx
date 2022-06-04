import { Box, SpacerProps, useColorModeValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { BASE_TRANSITION } from '../constants/ui/transitions';

interface ICardProps {
    padding: SpacerProps['p'];
    fullHeight: boolean;
}

const Card: React.FC<PropsWithChildren<ICardProps>> = ({
    children,
    padding = 6,
    fullHeight = false
}) => {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'lg'}
            rounded={{ base: 'md' }}
            p={padding}
            h={fullHeight ? '100%' : undefined}
            overflow={'hidden'}
            _hover={{
                boxShadow: 'dark-lg',
                transform: 'skewY(-0.1deg) scale(1.01)'
            }}
            transition={BASE_TRANSITION}>
            {children}
        </Box>
    );
};

export default Card;
