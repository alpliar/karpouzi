import {
    Box,
    BoxProps,
    Center,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
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

export interface SectionProps {
    bgColor?: string;
    isEven?: boolean;
    imageTransform?: TransformProps['transform'];
    customImageSize?: ImageProps['sizes'];
    customGap?: FlexProps['gap'];
    id?: string;
    useSecondaryColor?: boolean;
    title: string;
    titleComplement?: string;
    subtitle?: string | React.ReactNode;
    description?: string;
    url?: string;
    image?: string;
    imageThumbnail?: string;
    buttonLabel?: string;
    colorScheme?: ThemingProps['colorScheme'];
    pattern?: Pattern;
    component?: React.ReactNode;
    headingTag?: HeadingProps['as'];
    headingFontSize?: HeadingProps['fontSize'];
    aboveTitleSlot?: React.ReactNode;
    paddingY?: BoxProps['padding'];
}

const Section: React.FC<SectionProps> = ({
    id = undefined,
    pattern = undefined,
    bgColor = 'green',
    colorScheme = 'green',
    isEven = false,
    imageTransform = undefined,
    customImageSize = undefined,
    customGap = undefined,
    useSecondaryColor = false,
    title,
    titleComplement,
    subtitle,
    description = undefined,
    url = undefined,
    image = undefined,
    imageThumbnail,
    buttonLabel = 'undefined',
    component = undefined,
    headingTag = 'h2',
    headingFontSize = {
        base: '2xl',
        md: '4xl'
    },
    aboveTitleSlot = undefined,
    paddingY = { base: 4, sm: 8, md: 16, xl: 24 }
}) => {
    const { colorMode } = useColorMode();
    const defaultImageSize = useBreakpointValue({ base: '32', md: '2xs', xl: 'xs' });
    const sectionShade =
        colorMode === 'light' ? (useSecondaryColor ? 50 : 100) : useSecondaryColor ? 900 : 800;
    const sectionBgColor = `${colorScheme}.${sectionShade}`;
    const bannerShade = colorMode === 'light' ? 400 : 600;
    const bannerBgColor = `${colorScheme}.${bannerShade}` || bgColor;
    const buttonColorScheme = ['white', 'whiteAlpha', 'blackAlpha'].includes(colorScheme)
        ? 'gray'
        : colorScheme;
    const imageSize = customImageSize || defaultImageSize;
    const gap = customGap || { base: 4, sm: 12, md: 12, xl: 24 };
    // const specialColorSchemes = ['white', 'whiteAlpha'];
    // const isSpecialColorScheme = specialColorSchemes.includes(colorScheme);

    return (
        <Box
            id={id}
            bgColor={sectionBgColor}
            paddingY={paddingY}
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
                    w="full"
                    flexGrow={1}
                    order={{
                        base: 'initial',
                        sm: isEven ? 'initial' : 2
                    }}>
                    {aboveTitleSlot && aboveTitleSlot}

                    <Heading
                        display="flex"
                        alignItems="center"
                        gap={2}
                        as={headingTag}
                        mb={description || component || url ? 4 : 0}
                        fontSize={headingFontSize}
                        letterSpacing="tight"
                        // {...textColor}
                        lineHeight={{
                            md: 'shorter'
                        }}>
                        {title}
                        {titleComplement && (
                            <Text as="span" fontWeight="light" fontSize=".6em">
                                {titleComplement}
                            </Text>
                        )}
                    </Heading>

                    {subtitle && (
                        <Heading as="p" fontSize="md" fontWeight="normal" maxW="80ch">
                            {subtitle}
                        </Heading>
                    )}

                    {description && (
                        <Text
                            mb={5}
                            // {...textColor}
                            fontSize={{
                                md: 'lg'
                            }}>
                            {description}
                        </Text>
                    )}

                    {component && (
                        <Box
                        // {...textColor}
                        >
                            {component}
                        </Box>
                    )}
                    {url && (
                        <Box>
                            <Link
                                fontFamily="heading"
                                w={{
                                    base: 'full',
                                    sm: 'auto'
                                }}
                                // size="lg"
                                href={url}
                                asButton
                                buttonProps={{
                                    colorScheme: buttonColorScheme
                                }}>
                                {buttonLabel}
                            </Link>
                        </Box>
                    )}
                </Box>

                {image && (
                    <Banner
                        rounded="xl"
                        pattern={pattern}
                        bgColor={bannerBgColor}
                        height="10px"
                        patternOpacity={0.3}>
                        <Center transform={imageTransform}>
                            <Box rounded="xl" overflow="hidden" boxShadow="md">
                                <Image
                                    sizes={imageSize}
                                    quality={75}
                                    priority
                                    src={image}
                                    alt={title}
                                    w={imageSize}
                                    h={imageSize}
                                    blurDataURL={imageThumbnail}
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
