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
    description?: string;
    url?: string;
    image?: string;
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
    description = undefined,
    url = undefined,
    image = undefined,
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
    const specialColorSchemes = ['whiteAlpha'];
    const isSpecialColorScheme = specialColorSchemes.includes(colorScheme);
    const textColor = isSpecialColorScheme
        ? {
              color: 'black',
              _dark: {
                  color: 'black'
              }
          }
        : {};

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
                        as={headingTag}
                        mb={description || component || url ? 4 : 0}
                        fontSize={headingFontSize}
                        letterSpacing="tight"
                        {...textColor}
                        lineHeight={{
                            md: 'shorter'
                        }}>
                        {title}
                    </Heading>

                    {description && (
                        <Text
                            paddingLeft={{ xl: 5 }}
                            mb={5}
                            {...textColor}
                            fontSize={{
                                md: 'lg'
                            }}>
                            {description}
                        </Text>
                    )}

                    {component && (
                        <Box paddingLeft={{ xl: 5 }} {...textColor}>
                            {component}
                        </Box>
                    )}
                    {url && (
                        <Box paddingLeft={{ xl: 5 }}>
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
                                    src={image}
                                    alt={title}
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
