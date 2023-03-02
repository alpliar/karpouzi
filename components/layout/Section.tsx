import {
    AspectRatio,
    AspectRatioProps,
    BackgroundProps,
    Box,
    BoxProps,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
    LayoutProps,
    Text,
    ThemingProps,
    TransformProps,
    useColorMode
} from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { BASE_TRANSITION } from '../../constants/ui/transitions';
import { getPattern, Pattern } from '../../utils/patterns';
import { Image } from '../image';
import Link from '../link';

export interface SectionProps {
    bgColor?: string;
    isEven?: boolean;
    imageTransform?: TransformProps['transform'];
    customImageSize?: LayoutProps['width'];
    customGap?: FlexProps['gap'];
    id?: string;
    useSecondaryColor?: boolean;
    title: string;
    titleComplement?: React.ReactNode;
    subtitle?: string | React.ReactNode;
    description?: string;
    url?: string;
    image?: string;
    fillImage?: boolean;
    imageThumbnail?: string;
    buttonLabel?: string;
    colorScheme?: ThemingProps['colorScheme'];
    pattern?: Pattern;
    component?: React.ReactNode;
    headingTag?: HeadingProps['as'];
    headingFontSize?: HeadingProps['fontSize'];
    aboveTitleSlot?: React.ReactNode;
    paddingY?: BoxProps['padding'];
    centerItems?: boolean;
    isFirst?: boolean;
    customDirection?: FlexProps['direction'];
    customImageRatio?: AspectRatioProps['ratio'];
    priorityImage?: boolean;
    sectionPattern?: Pattern;
}

const Section: React.FC<SectionProps> = ({
    id,
    pattern = 'kiwi',
    sectionPattern,
    bgColor = 'green',
    colorScheme = 'green',
    isEven = false,
    imageTransform,
    customImageSize,
    customGap,
    useSecondaryColor = false,
    title,
    titleComplement,
    subtitle,
    description,
    url,
    image,
    imageThumbnail,
    fillImage = false,
    buttonLabel = 'undefined',
    component,
    headingTag = 'h2',
    headingFontSize = {
        base: '2xl',
        xl: '3xl'
    },
    aboveTitleSlot,
    paddingY = { base: 4, sm: 8, md: 16, xl: 24 },
    centerItems = true,
    isFirst = false,
    customDirection,
    customImageRatio,
    priorityImage
}) => {
    const { colorMode } = useColorMode();
    const sectionShade =
        colorMode === 'light' ? (useSecondaryColor ? 50 : 100) : useSecondaryColor ? -1 : 800; // -1 to prevent colored background on dark mode
    const sectionBgColor = `${colorScheme}.${sectionShade}`;
    const bannerShade = colorMode === 'light' ? 400 : 600;
    const bannerBgColor = `${colorScheme}.${bannerShade}` || bgColor;
    const buttonColorScheme = ['white', 'whiteAlpha', 'blackAlpha'].includes(colorScheme)
        ? 'gray'
        : colorScheme;
    const gap = customGap || { base: 4, sm: 6, md: 12, xl: 24 };

    const bgImage: BackgroundProps['backgroundImage'] = pattern
        ? getPattern(pattern, 'paper', 0.3)
        : undefined;

    const bgSection: BackgroundProps['backgroundImage'] = sectionPattern
        ? getPattern(sectionPattern, 'textOnSurface', 0.04)
        : undefined;
    return (
        <Box
            id={id}
            bgColor={sectionBgColor}
            bgImage={`url("${bgSection}")`}
            paddingBottom={paddingY}
            paddingTop={isFirst ? 0 : paddingY}
            // paddingBottom={{ base: 4 }}
        >
            <Flex
                transition={BASE_TRANSITION}
                direction={customDirection || { base: 'column', sm: 'row' }}
                w="full"
                paddingX={{ base: 2, sm: 4 }}
                mx="auto"
                maxW={APP_MAX_WIDTH}
                alignItems={centerItems ? 'center' : 'start'}
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
                        flexWrap="wrap"
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
                        <Heading
                            as="p"
                            fontSize="md"
                            fontWeight="normal"
                            maxW="80ch"
                            mb={description || component || url ? 4 : 0}>
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
                                    colorScheme: buttonColorScheme,
                                    shadow: 'md'
                                }}>
                                {buttonLabel}
                            </Link>
                        </Box>
                    )}
                </Box>

                {image && (
                    <Flex
                        transition={BASE_TRANSITION}
                        w={customImageSize || 'full'}
                        // alignSelf="stretch"
                        alignSelf={fillImage ? 'stretch' : 'start'}
                        alignItems="start"
                        backgroundColor={bannerBgColor}
                        rounded="md"
                        bgImage={bgImage}>
                        <Flex
                            rounded="md"
                            w="full"
                            boxShadow="md"
                            overflow="hidden"
                            transform={imageTransform}
                            alignSelf={fillImage ? 'stretch' : undefined}>
                            <AspectRatio ratio={customImageRatio || 1} w="full">
                                <Image
                                    alignSelf="stretch"
                                    w={{ base: 'full', sm: '50vw' }}
                                    h={{ base: '100vw', sm: '50vw' }}
                                    src={image}
                                    alt={title}
                                    quality={60}
                                    priority={priorityImage}
                                    blurDataURL={imageThumbnail}
                                />
                            </AspectRatio>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Section;
