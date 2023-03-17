import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { BASE_TRANSITION } from '../../constants/ui/transitions';

interface ShopGridProps {
    children: React.ReactNode;
}

const ShopGrid: React.FC<ShopGridProps> = ({ children }) => {
    return (
        <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4, '2xl': 5 }}
            maxWidth={APP_MAX_WIDTH}
            mx="auto"
            paddingY={{ base: 2, sm: 4 }}
            spacingX={{ base: 1, sm: 2, '2xl': 4 }}
            spacingY={{ base: 4, sm: 4, '2xl': 8 }}
            transition={BASE_TRANSITION}>
            {children}
        </SimpleGrid>
    );
};

export default ShopGrid;
