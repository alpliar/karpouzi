import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex } from '@chakra-ui/layout';
import { BackgroundProps, FilterProps, LayoutProps } from '@chakra-ui/styled-system';
import { PropsWithChildren } from 'react';

interface IBannerProps {
    height?: LayoutProps['height'];
    bgColor?: BackgroundProps['bgColor'];
    pattern?:
        | 'stars'
        | 'kiwi'
        | 'plus'
        | 'leaf'
        | 'linesInMotion'
        | 'groovy'
        | 'curtains'
        | 'wiggle'
        | 'bubbles'
        | 'autumn';
}
const Banner: React.FC<PropsWithChildren<IBannerProps>> = ({
    children,
    height = '3xs',
    bgColor,
    pattern = 'kiwi'
}) => {
    const patternOpacity = 0.3;
    const bgOpacity = 1;
    const bgFilter: FilterProps['filter'] = undefined;
    const patternColor: string = useColorModeValue('white', 'black');
    // const textShadow: TextDecorationProps['textShadow'] = useColorModeValue(
    //     '3px 3px 5px rgba(255,255,255,0.5)',
    //     '3px 3px 5px rgba(0,0,0,0.5)'
    // );
    const backgroundPatterns = {
        autumn: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='${patternColor}' fill-opacity='${patternOpacity}'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
        bubbles: `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E`,
        curtains: `data:image/svg+xml,%3Csvg width='44' height='12' viewBox='0 0 44 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12v-2L0 0v10l4 2h16zm18 0l4-2V0L22 10v2h16zM20 0v8L4 0h16zm18 0L22 8V0h16z' fill='${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E`,
        groovy: `data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V0C4.477 0 0 4.477 0 10v30zm22 0c-5.523 0-10-4.477-10-10V0c5.523 0 10 4.477 10 10v30z' fill='${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E`,
        kiwi: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='44' viewBox='0 0 34 44'%3E%3Cg fill='${patternColor}' fill-opacity='${patternOpacity}'%3E%3Cpath fill-rule='evenodd' d='M1 6.2C.72 5.55.38 4.94 0 4.36v13.28c.38-.58.72-1.2 1-1.84A12.04 12.04 0 0 0 7.2 22 12.04 12.04 0 0 0 1 28.2c-.28-.65-.62-1.26-1-1.84v13.28c.38-.58.72-1.2 1-1.84A12.04 12.04 0 0 0 7.2 44h21.6a12.05 12.05 0 0 0 5.2-4.36V26.36A12.05 12.05 0 0 0 28.8 22a12.05 12.05 0 0 0 5.2-4.36V4.36A12.05 12.05 0 0 0 28.8 0H7.2A12.04 12.04 0 0 0 1 6.2zM17.36 23H12a10 10 0 1 0 0 20h5.36a11.99 11.99 0 0 1 0-20zm1.28-2H24a10 10 0 1 0 0-20h-5.36a11.99 11.99 0 0 1 0 20zM12 1a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3.46-2a2 2 0 1 0-3.47 2 2 2 0 0 0 3.47-2zm0-4a2 2 0 1 0-3.47-2 2 2 0 0 0 3.47 2zM12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3.46 2a2 2 0 1 0 3.47-2 2 2 0 0 0-3.47 2zm0 4a2 2 0 1 0 3.47 2 2 2 0 0 0-3.47-2zM24 43a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3.46 2a2 2 0 1 0 3.47-2 2 2 0 0 0-3.47 2zm0 4a2 2 0 1 0 3.47 2 2 2 0 0 0-3.47-2zM24 37a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3.46-2a2 2 0 1 0-3.47 2 2 2 0 0 0 3.47-2zm0-4a2 2 0 1 0-3.47-2 2 2 0 0 0 3.47 2z'/%3E%3C/g%3E%3C/svg%3E`,
        leaf: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='${patternColor}' fill-opacity='${patternOpacity}' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E`,
        linesInMotion: `data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 0h2v20H9V0zm25.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm-20 20l1.732 1-10 17.32-1.732-1 10-17.32zM58.16 4.134l1 1.732-17.32 10-1-1.732 17.32-10zm-40 40l1 1.732-17.32 10-1-1.732 17.32-10zM80 9v2H60V9h20zM20 69v2H0v-2h20zm79.32-55l-1 1.732-17.32-10L82 4l17.32 10zm-80 80l-1 1.732-17.32-10L2 84l17.32 10zm96.546-75.84l-1.732 1-10-17.32 1.732-1 10 17.32zm-100 100l-1.732 1-10-17.32 1.732-1 10 17.32zM38.16 24.134l1 1.732-17.32 10-1-1.732 17.32-10zM60 29v2H40v-2h20zm19.32 5l-1 1.732-17.32-10L62 24l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM111 40h-2V20h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zM40 49v2H20v-2h20zm19.32 5l-1 1.732-17.32-10L42 44l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM91 60h-2V40h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM39.32 74l-1 1.732-17.32-10L22 64l17.32 10zm16.546 4.16l-1.732 1-10-17.32 1.732-1 10 17.32zM71 80h-2V60h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM120 89v2h-20v-2h20zm-84.134 9.16l-1.732 1-10-17.32 1.732-1 10 17.32zM51 100h-2V80h2v20zm3.134.84l1.732 1-10 17.32-1.732-1 10-17.32zm24.026 3.294l1 1.732-17.32 10-1-1.732 17.32-10zM100 109v2H80v-2h20zm19.32 5l-1 1.732-17.32-10 1-1.732 17.32 10zM31 120h-2v-20h2v20z' fill='${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'/%3E%3C/svg%3E`,
        plus: `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${patternColor}' fill-opacity='${patternOpacity}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`,
        stars: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='${patternColor}' fill-opacity='${patternOpacity}'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E`,
        wiggle: `data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${patternColor}' fill-opacity='${patternOpacity}'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E`
    };

    const bgImage: BackgroundProps['backgroundImage'] = backgroundPatterns[pattern]; //backgroundPatterns.linesInMotion;

    const defaultBgColor = useColorModeValue('green.400', 'green.800');

    return (
        <Flex
            height={height}
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            fontSize="4xl"
            position="relative">
            {/* <Box zIndex="banner" rounded="xl" bgColor={bgColor}> */}
            <Box zIndex="banner" rounded="xl">
                {children}
            </Box>
            <Box
                filter={bgFilter}
                zIndex="base"
                className="toto"
                position="absolute"
                top="0"
                height="100%"
                width="100%"
                opacity={bgOpacity}
                bgColor={bgColor || defaultBgColor}
                backgroundImage={`url("${bgImage}")`}
            />
        </Flex>
    );
};

export default Banner;
