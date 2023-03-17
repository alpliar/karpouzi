import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, BoxProps, Flex } from '@chakra-ui/layout';
import { BackgroundProps, FilterProps, LayoutProps } from '@chakra-ui/styled-system';
import { getPattern, Pattern } from '../utils/patterns';

interface IBannerProps {
    children: React.ReactElement;
    height?: LayoutProps['height'];
    bgColor?: BoxProps['bgColor'];
    pattern?: Pattern;
    patternOpacity?: number;
    rounded?: BoxProps['rounded'];
}
const Banner: React.FC<IBannerProps & BoxProps> = ({
    children,
    height = '3xs',
    pattern = 'kiwi',
    patternOpacity = 0.1,
    bgColor,
    rounded = undefined,
    ...rest
}) => {
    const bgOpacity = 1;
    const bgFilter: FilterProps['filter'] = undefined;
    const patternColor: string = useColorModeValue('white', 'black');

    const bgImage: BackgroundProps['backgroundImage'] = getPattern(
        pattern,
        patternColor,
        patternOpacity
    );

    const defaultBgColor = useColorModeValue('green.400', 'green.800');

    return (
        <Flex
            minHeight={height}
            textAlign={{ base: 'start', sm: 'center' }}
            alignItems="center"
            justifyContent="center"
            fontSize="4xl"
            position="relative">
            {/* <Box zIndex="banner" rounded="xl" bgColor={bgColor}> */}
            <Box zIndex={1} rounded="xl" {...rest} maxW="full">
                {children}
            </Box>
            <Box
                filter={bgFilter}
                zIndex="base"
                position="absolute"
                top="0"
                height="100%"
                width="100%"
                opacity={bgOpacity}
                bgColor={bgColor || defaultBgColor}
                rounded={rounded}
                overflow={rounded ? 'hidden' : undefined}
                backgroundImage={`url("${bgImage}")`}
            />
        </Flex>
    );
};

export default Banner;
