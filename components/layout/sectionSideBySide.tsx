import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { ThemingProps, useColorMode } from '@chakra-ui/system';

import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { Pattern } from '../../utils/patterns';
import Banner from '../banner';
import { Image } from '../image';
import Link from '../link';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
    sections: Section[];
};

export interface Section {
    title: string;
    description: string;
    url?: string;
    image: string;
    buttonLabel: string;
    colorScheme?: ThemingProps['colorScheme'];
    pattern?: Pattern;
    component?: React.ReactElement;
}

const SectionSideBySide: React.FC<Props> = ({ sections }) => {
    const { colorMode } = useColorMode();
    const gridSpacingX = useBreakpointValue({ base: 10, md: 16, lg: 24 });
    const gridSpacingY = useBreakpointValue({ base: 10, md: 16, lg: 32 });
    const gridRowMarginBottom = useBreakpointValue({ base: 10, md: 16, lg: 24 });

    const imageSize = useBreakpointValue({ base: '3xs', sm: '2xs', xl: 'xs' });

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
                        <Box
                            bgColor={`${colorScheme}.${colorMode === 'light' ? 100 : 900}`}
                            key={index}
                            paddingTop={{ base: 4, sm: 8, md: 16, xl: 24 }}
                            paddingBottom={{ base: 4 }}>
                            <SimpleGrid
                                px={{ base: 4, sm: 8, xl: 16 }}
                                mx="auto"
                                maxW={APP_MAX_WIDTH}
                                alignItems="center"
                                columns={{
                                    base: 1,
                                    md: 2
                                }}
                                columnGap={{ md: 24, xl: 32 }}
                                // flexDirection={'column-reverse'}
                                mb={gridRowMarginBottom}
                                spacingY={gridSpacingX}
                                spacingX={gridSpacingY}>
                                <Box
                                    order={{
                                        base: 'initial',
                                        md: isEven ? 'initial' : 2
                                    }}>
                                    <Heading
                                        as="h2"
                                        mb={4}
                                        fontSize={{
                                            base: '2xl',
                                            md: '4xl'
                                        }}
                                        letterSpacing="tight"
                                        color="gray.800"
                                        _dark={{
                                            color: 'gray.200'
                                        }}
                                        lineHeight={{
                                            md: 'shorter'
                                        }}>
                                        {section.title}
                                    </Heading>
                                    <Text
                                        mb={5}
                                        color="gray.800"
                                        _dark={{
                                            color: 'gray.200'
                                        }}
                                        fontSize={{
                                            md: 'lg'
                                        }}>
                                        {section.description}
                                    </Text>

                                    {section.component && <>{section.component}</>}
                                    {section.url && (
                                        <Link
                                            fontFamily="heading"
                                            w={{
                                                base: 'full',
                                                sm: 'auto'
                                            }}
                                            // size="lg"
                                            href={section.url}
                                            asButton
                                            buttonProps={{
                                                colorScheme
                                            }}>
                                            {section.buttonLabel}
                                        </Link>
                                    )}
                                </Box>

                                <Banner
                                    rounded="xl"
                                    pattern={pattern}
                                    bgColor={bgColor}
                                    height="10px"
                                    patternOpacity={0.3}>
                                    <Center
                                        transform={{
                                            md: `
                                        translateY(${isEven ? 10 : -10}%) 
                                        translateX(${isEven ? -25 : 25}%)`
                                        }}>
                                        <Box
                                            w={imageSize}
                                            h={imageSize}
                                            rounded="xl"
                                            overflow="hidden"
                                            boxShadow="md">
                                            <Image
                                                sizes={imageSize}
                                                quality={75}
                                                priority
                                                src={section.image}
                                                alt={section.title}
                                                w={imageSize}
                                                h={imageSize}
                                            />
                                        </Box>
                                    </Center>
                                </Banner>
                            </SimpleGrid>
                        </Box>
                    );
                })}
            </Box>
        </Flex>
    );
};

export default SectionSideBySide;
