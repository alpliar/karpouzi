import { Box, Flex } from '@chakra-ui/layout';
import { ThemingProps, useColorMode } from '@chakra-ui/system';

import React from 'react';
import Section, { SectionProps } from './Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
    sections: SectionProps[];
};

const SectionSideBySide: React.FC<Props> = ({ sections }) => {
    const { colorMode } = useColorMode();

    return (
        <Flex w="full" justifyContent="center" alignItems="center">
            <Box w="full">
                {sections.map((section, index) => {
                    const isEven: boolean = index % 2 === 0;
                    const colorScheme: ThemingProps['colorScheme'] =
                        section.colorScheme || (isEven ? 'teal' : 'orange');
                    const bgColor =
                        colorMode === 'light' ? `${colorScheme}.200` : `${colorScheme}.800`;
                    const pattern = section.pattern || 'linesInMotion';
                    return (
                        <Section
                            key={index}
                            pattern={pattern}
                            bgColor={bgColor}
                            section={section}
                            colorScheme={colorScheme}
                            isEven={isEven}
                            imageTransform={{
                                sm: `
                                    translateY(${isEven ? 10 : 10}%) 
                                    translateX(${isEven ? -10 : 10}%)`
                            }}
                            customGap={{ base: 4, sm: 12, md: 24, xl: 32 }}
                        />
                    );
                })}
            </Box>
        </Flex>
    );
};

export default SectionSideBySide;
