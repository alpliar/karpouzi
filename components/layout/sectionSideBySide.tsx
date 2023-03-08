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
                            // isFirst={!index}
                            pattern={pattern}
                            bgColor={bgColor}
                            {...section}
                            colorScheme={colorScheme}
                            isEven={isEven}
                            imageContainerProps={{
                                transform: {
                                    sm: `
                                        translateY(${isEven ? 2 : 2}%) 
                                        translateX(${isEven ? -2 : 2}%)
                                        rotate(${isEven ? '-.5deg' : '.5deg'})
                                        `
                                },
                                maxWidth: { sm: '3xs' }
                            }}
                        />
                    );
                })}
            </Box>
        </Flex>
    );
};

export default SectionSideBySide;
