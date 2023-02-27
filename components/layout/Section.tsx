import {
    AspectRatio,
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
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
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
    titleComplement?: string;
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
}

const Section: React.FC<SectionProps> = ({
    id = undefined,
    pattern = 'kiwi',
    bgColor = 'green',
    colorScheme = 'green',
    isEven = false,
    imageTransform = undefined,
    customImageSize,
    customGap = undefined,
    useSecondaryColor = false,
    title,
    titleComplement,
    subtitle,
    description = undefined,
    url = undefined,
    image = undefined,
    imageThumbnail,
    fillImage = false,
    buttonLabel = 'undefined',
    component = undefined,
    headingTag = 'h2',
    headingFontSize = {
        base: '2xl',
        xl: '3xl'
    },
    aboveTitleSlot = undefined,
    paddingY = { base: 4, sm: 8, md: 16, xl: 24 },
    centerItems = true,
    isFirst = false
}) => {
    const { colorMode } = useColorMode();
    // const defaultImageSize = useBreakpointValue({ base: '32', md: '2xs', xl: 'xs' });
    const sectionShade =
        colorMode === 'light' ? (useSecondaryColor ? 50 : 100) : useSecondaryColor ? 900 : 800;
    const sectionBgColor = `${colorScheme}.${sectionShade}`;
    const bannerShade = colorMode === 'light' ? 400 : 600;
    const bannerBgColor = `${colorScheme}.${bannerShade}` || bgColor;
    const buttonColorScheme = ['white', 'whiteAlpha', 'blackAlpha'].includes(colorScheme)
        ? 'gray'
        : colorScheme;
    // const imageSize = customImageSize || defaultImageSize;
    const gap = customGap || { base: 4, sm: 6, md: 12, xl: 24 };
    // const specialColorSchemes = ['white', 'whiteAlpha'];
    // const isSpecialColorScheme = specialColorSchemes.includes(colorScheme);

    const bgImage: BackgroundProps['backgroundImage'] = getPattern(
        pattern,
        useColorModeValue('white', 'black'),
        0.3
    );
    return (
        <Box
            id={id}
            bgColor={sectionBgColor}
            paddingBottom={paddingY}
            paddingTop={isFirst ? 0 : paddingY}
            // paddingBottom={{ base: 4 }}
        >
            <Flex
                direction={{ base: 'column', sm: 'row' }}
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
                    <Flex
                        w={customImageSize || 'full'}
                        // alignSelf="stretch"
                        alignSelf={fillImage ? 'stretch' : 'start'}
                        alignItems="start"
                        backgroundColor={bannerBgColor}
                        rounded="md"
                        bgImage={`url("${bgImage}")`}>
                        <Flex
                            rounded="md"
                            w="full"
                            boxShadow="md"
                            overflow="hidden"
                            transform={imageTransform}
                            alignSelf={fillImage ? 'stretch' : undefined}>
                            <AspectRatio ratio={1} w="full">
                                <Image
                                    alignSelf="stretch"
                                    w={{ base: 'full', sm: '50vw' }}
                                    h={{ base: '100vw', sm: '50vw' }}
                                    src={image}
                                    alt={title}
                                    quality={75}
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
