import {
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    Text,
    ThemingProps,
    useBreakpointValue,
    useColorMode
} from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { Pattern } from '../../utils/patterns';
import Banner from '../banner';
import { Image } from '../image';
import Link from '../link';

type Props = {
    section: SectionProps;
    pattern?: Pattern;
    bgColor?: string;
    colorScheme?: ThemingProps['colorScheme'];
    isEven?: boolean;
};

export interface SectionProps {
    title: string;
    description?: string;
    url?: string;
    image?: string;
    buttonLabel?: string;
    colorScheme?: ThemingProps['colorScheme'];
    pattern?: Pattern;
    component?: React.ReactNode;
}
const Section: React.FC<Props> = ({
    pattern = undefined,
    bgColor = 'green',
    colorScheme = 'green',
    section,
    isEven = false
}) => {
    const { colorMode } = useColorMode();
    const gridRowMarginBottom = useBreakpointValue({ base: 10, md: 16, lg: 24 });
    const imageSize = useBreakpointValue({ base: '32', md: '2xs', xl: 'xs' });
    return (
        <Box
            bgColor={`${colorScheme}.${colorMode === 'light' ? 100 : 900}`}
            paddingY={{ base: 4, sm: 8, md: 16, xl: 24 }}
            // paddingBottom={{ base: 4 }}
        >
            <Grid
                w="full"
                px={{ base: 4, sm: 8, xl: 16 }}
                mx="auto"
                maxW={APP_MAX_WIDTH}
                alignItems="center"
                templateColumns={{
                    base: 'repeat(1,1fr)',
                    sm: 'repeat(3,1fr)',
                    xl: 'repeat(5,1fr)'
                }}
                gap={{ base: 4, sm: 12, md: 24, xl: 32 }}
                mb={section.image ? gridRowMarginBottom : 0}>
                <GridItem
                    colSpan={section.image ? { sm: 2, xl: 3 } : { sm: 3, xl: 5 }}
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
                </GridItem>

                {section.image && (
                    <GridItem colSpan={{ sm: 1, xl: 2 }}>
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
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
};

export default Section;
