import { Box, chakra, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
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
            url: '/shop'
        },
        {
            title: 'About Karpouzi',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum accusamus laborum suscipit, fuga obcaecati, illo sapiente officia ratione, laudantium atque repudiandae quis minima eaque alias error quae eligendi perspiciatis! Debitis.',
            url: '/blog'
        }
    ];

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
                                <chakra.h2
                                    mb={4}
                                    fontSize={{
                                        base: '2xl',
                                        md: '4xl'
                                    }}
                                    fontWeight="extrabold"
                                    letterSpacing="tight"
                                    // textAlign={{
                                    //     base: 'center',
                                    //     md: 'left'
                                    // }}
                                    color="gray.900"
                                    _dark={{
                                        color: 'gray.400'
                                    }}
                                    lineHeight={{
                                        md: 'shorter'
                                    }}
                                    // textShadow="2px 0 currentcolor"
                                >
                                    {block.title}
                                </chakra.h2>
                                <chakra.p
                                    mb={5}
                                    // textAlign={{
                                    //     base: 'center',
                                    //     sm: 'left'
                                    // }}
                                    color="gray.600"
                                    _dark={{
                                        color: 'gray.400'
                                    }}
                                    fontSize={{
                                        md: 'lg'
                                    }}>
                                    {block.description}
                                </chakra.p>

                                <Link
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
                            <Box
                                w="full"
                                h="full"
                                py={48}
                                bg="gray.200"
                                _dark={{
                                    bg: 'gray.700'
                                }}></Box>
                        </SimpleGrid>
                    );
                })}
            </Box>
        </Flex>
    );
};

export default SectionSideBySide;
