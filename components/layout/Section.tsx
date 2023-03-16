import {
    AspectRatioProps,
    BackgroundProps,
    Box,
    BoxProps,
    Center,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
    Text,
    ThemingProps,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { BASE_TRANSITION, VERY_SLOW_TRANSITION } from '../../constants/ui/transitions';
import { getPattern, Pattern } from '../../utils/patterns';
import ImageV2, { ImageV2Props } from '../ImageV2';
import Link from '../link';

export interface SectionProps {
    bgColor?: string;
    isEven?: boolean;
    // imageTransform?: TransformProps['transform'];
    // customImageSize?: LayoutProps['width'];
    customGap?: FlexProps['gap'];
    id?: string;
    useSecondaryColor?: boolean;
    usePlainColor?: boolean;
    title?: string;
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
    imageProps?: ImageV2Props['imageProps'];
    imageContainerProps?: AspectRatioProps;
    rest?: BoxProps;
    skewed?: boolean;
    fullWidth?: boolean;
}

const Section: React.FC<SectionProps & BoxProps> = ({
    id,
    pattern = 'kiwi',
    sectionPattern,
    bgColor = 'green',
    colorScheme = 'green',
    isEven = false,
    // imageTransform,
    // customImageSize,
    customGap,
    useSecondaryColor = false,
    usePlainColor = false,
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
        base: '2xl'
        // xl: '3xl'
    },
    aboveTitleSlot,
    paddingY = { base: 8, md: 16, xl: 24 },
    centerItems = true,
    isFirst = false,
    customDirection,
    customImageRatio,
    priorityImage,
    imageProps,
    imageContainerProps,
    skewed = true,
    fullWidth = false,
    ...rest
}) => {
    const { colorMode } = useColorMode();
    const sectionShade =
        colorMode === 'light' ? (useSecondaryColor ? 50 : 100) : useSecondaryColor ? -1 : 800; // -1 to prevent colored background on dark mode
    const sectionBgColor = usePlainColor
        ? `${colorScheme}.${colorMode === 'light' ? 400 : 700}`
        : `${colorScheme}.${sectionShade}`;
    const bannerShade = colorMode === 'light' ? 400 : 600;
    const bannerBgColor = `${colorScheme}.${bannerShade}` || bgColor;
    const buttonColorScheme = ['white', 'whiteAlpha', 'blackAlpha'].includes(colorScheme)
        ? 'gray'
        : colorScheme;
    // const gap = customGap || { base: 2, sm: 4, md: 12, xl: 24 };

    const patternColor: string = useColorModeValue('black', 'white');
    const patternOpacity: number = useColorModeValue(0.03, 0.05);

    const bgImage: BackgroundProps['backgroundImage'] = pattern
        ? getPattern(pattern, 'paper', 0.2)
        : undefined;

    const bgSection: BackgroundProps['backgroundImage'] = sectionPattern
        ? getPattern(sectionPattern, patternColor, patternOpacity)
        : undefined;

    const transformAngle = '-1deg';

    return (
        <Center
            zIndex={isFirst ? 1 : undefined}
            position="relative"
            isolation="isolate"
            _before={{
                content: 'no-open-quote',
                position: 'absolute',
                inset: 0,
                transform: skewed ? { base: `skewY(${transformAngle})` } : undefined,
                backgroundColor: sectionBgColor,
                zIndex: -2
            }}
            _after={{
                content: 'no-close-quote',
                position: 'absolute',
                inset: 0,
                bgImage: `url("${bgSection}")`,
                transform: skewed ? { base: `rotate(${transformAngle})` } : undefined,
                zIndex: -1
            }}
            id={id}
            bgGradient={
                isFirst
                    ? `linear(to-tl, transparent, transparent,${sectionBgColor},${sectionBgColor})`
                    : undefined
            }
            paddingBottom={paddingY}
            paddingTop={paddingY}
            transition={VERY_SLOW_TRANSITION}
            {...rest}>
            <Flex
                transition={BASE_TRANSITION}
                direction={customDirection || { base: 'column', sm: 'row' }}
                width="full"
                paddingX={fullWidth ? undefined : { base: 2, sm: 4 }}
                mx="auto"
                maxWidth={fullWidth ? undefined : APP_MAX_WIDTH}
                alignItems={centerItems ? 'center' : 'start'}
                justify="space-between"
                gap={customGap || { base: 2, sm: 12, md: 12, xl: 24 }}
                rowGap={{ base: 4 }}>
                <Box
                    flexGrow={1}
                    paddingX={{ base: 2, sm: 0 }}
                    justifyContent="center"
                    width={{ base: 'full', sm: image ? '50%' : 'full' }}
                    order={{
                        base: 'initial',
                        sm: isEven ? 'initial' : 2
                    }}>
                    {aboveTitleSlot && aboveTitleSlot}

                    {title && (
                        <Heading
                            display="flex"
                            flexWrap="wrap"
                            alignItems="center"
                            gap={2}
                            as={headingTag}
                            mb={subtitle || description || component || url ? 4 : 0}
                            fontSize={headingFontSize}
                            letterSpacing="tight"
                            lineHeight={{
                                md: 'shorter'
                            }}
                            maxWidth={{ sm: '90%' }}>
                            {title}
                            {titleComplement && (
                                <Text as="span" fontWeight="light" fontSize=".6em">
                                    {titleComplement}
                                </Text>
                            )}
                        </Heading>
                    )}

                    {subtitle && (
                        <Heading
                            as="p"
                            fontSize="md"
                            fontWeight="400"
                            maxW="80ch"
                            mb={description || component || url ? 4 : 0}>
                            {subtitle}
                        </Heading>
                    )}

                    {description && (
                        <Text mb={5} maxWidth="50ch">
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
                        width={{ base: 'full', sm: '50%' }}
                        transition={BASE_TRANSITION}
                        alignSelf={fillImage ? 'stretch' : 'center'}
                        backgroundColor={bannerBgColor}
                        rounded="md"
                        bgImage={`url("${bgImage}")`}
                        maxWidth={imageContainerProps?.maxWidth || imageContainerProps?.maxW}>
                        <ImageV2
                            src={image}
                            alt={title || 'illustration'}
                            blurDataURL={imageThumbnail}
                            priority={priorityImage}
                            ratio={customImageRatio || 1}
                            imageProps={imageProps}
                            rounded="md"
                            boxShadow="dark-lg"
                            overflow="hidden"
                            alignSelf={fillImage ? 'stretch' : undefined}
                            {...imageContainerProps}
                        />
                    </Flex>
                )}
            </Flex>
        </Center>
    );
};

export default Section;
