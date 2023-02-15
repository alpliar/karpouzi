import { Box, Center, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { useColorModeValue } from '@chakra-ui/system';

import React from 'react';
import Banner from '../banner';
import { Image } from '../image';
import Link from '../link';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const SectionSideBySide: React.FC<Props> = ({}) => {
    const gridSpacingX = useBreakpointValue({ base: 10, md: 16, lg: 24 });
    const gridSpacingY = useBreakpointValue({ base: 10, md: 16, lg: 32 });
    const gridRowMarginBottom = useBreakpointValue({ base: 10, md: 16, lg: 24 });

    const mock = [
        {
            title: 'Discover our products',
            description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, ipsa perferendis. Iusto, hic ipsum numquam inventore quasi necessitatibus minus et cumque, libero aspernatur incidunt saepe voluptatibus rem repellendus, dolores ducimus!',
            url: '/shop',
            image: '/images/category/fruits.webp'
        },
        {
            title: 'About Karpouzi',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum accusamus laborum suscipit, fuga obcaecati, illo sapiente officia ratione, laudantium atque repudiandae quis minima eaque alias error quae eligendi perspiciatis! Debitis.',
            url: '/blog',
            image: '/images/karpouzi.webp'
        }
    ];

    const imageSize = useBreakpointValue({ base: '250px', xl: '400px' });
    const bgColor = useColorModeValue('green.200', 'green.800');

    return (
        <Flex w="full" justifyContent="center" alignItems="center">
            <Box px={8} py={8} mx="auto">
                {mock.map((block, index) => {
                    const isEven: boolean = index % 2 === 0;
                    return (
                        <SimpleGrid
                            key={index}
                            alignItems="center"
                            columns={{
                                base: 1,
                                md: 2
                            }}
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
                                    color="gray.900"
                                    _dark={{
                                        color: 'gray.400'
                                    }}
                                    lineHeight={{
                                        md: 'shorter'
                                    }}>
                                    {block.title}
                                </Heading>
                                <Text
                                    mb={5}
                                    color="gray.600"
                                    _dark={{
                                        color: 'gray.400'
                                    }}
                                    fontSize={{
                                        md: 'lg'
                                    }}>
                                    {block.description}
                                </Text>

                                <Link
                                    fontFamily="heading"
                                    w={{
                                        base: 'full',
                                        sm: 'auto'
                                    }}
                                    // size="lg"
                                    href={block.url}
                                    asButton>
                                    Learn More
                                </Link>
                            </Box>

                            <Banner
                                pattern="linesInMotion"
                                height={{ base: '75%', md: '50%', xl: '75%' }}
                                bgColor={bgColor}>
                                <Center>
                                    <Box w={imageSize} h={imageSize} rounded="xl" overflow="hidden">
                                        <Image
                                            sizes={imageSize}
                                            quality={75}
                                            src={block.image}
                                            alt={block.title}
                                            w={imageSize}
                                            h={imageSize}
                                        />
                                    </Box>
                                </Center>
                            </Banner>
                        </SimpleGrid>
                    );
                })}
            </Box>
        </Flex>
    );
};

export default SectionSideBySide;
