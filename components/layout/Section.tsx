import {
    Box,
    Center,
    Flex,
    FlexProps,
    Heading,
    ImageProps,
    Text,
    ThemingProps,
    TransformProps,
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
    imageTransform?: TransformProps['transform'];
    customImageSize?: ImageProps['sizes'];
    customGap?: FlexProps['gap'];
    id?: string;
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
    id = undefined,
    pattern = undefined,
    bgColor = 'green',
    colorScheme = 'green',
    section,
    isEven = false,
    imageTransform = undefined,
    customImageSize = undefined,
    customGap = undefined
}) => {
    const { colorMode } = useColorMode();
    const defaultImageSize = useBreakpointValue({ base: '32', md: '2xs', xl: 'xs' });
    const imageSize = customImageSize || defaultImageSize;
    const gap = customGap || { base: 4, sm: 12, md: 12, xl: 24 };

    return (
        <Box
            id={id}
            bgColor={`${colorScheme}.${colorMode === 'light' ? 100 : 900}`}
            paddingY={{ base: 4, sm: 8, md: 16, xl: 24 }}
            // paddingBottom={{ base: 4 }}
        >
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                w="full"
                paddingX={{ base: 2, sm: 4 }}
                mx="auto"
                maxW={APP_MAX_WIDTH}
                alignItems="center"
                gap={gap}>
                <Box
                    flexGrow={1}
                    order={{
                        base: 'initial',
                        sm: isEven ? 'initial' : 2
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
                        paddingLeft={{ xl: 5 }}
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

                    {section.component && <Box paddingLeft={{ xl: 5 }}>{section.component}</Box>}
                    {section.url && (
                        <Box paddingLeft={{ xl: 5 }}>
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
                        </Box>
                    )}
                </Box>

                {section.image && (
                    <Banner
                        rounded="xl"
                        pattern={pattern}
                        bgColor={`${colorScheme}.${colorMode === 'light' ? 400 : 600}` || bgColor}
                        height="10px"
                        patternOpacity={0.3}>
                        <Center transform={imageTransform}>
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
                )}
            </Flex>
        </Box>
    );
};

export default Section;
