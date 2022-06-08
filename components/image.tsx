import { Box, BoxProps, LayoutProps } from '@chakra-ui/react';
import NextImage from 'next/image';
import * as React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    width: LayoutProps['width'];
    height: LayoutProps['height'];
}

export const Image: React.FC<ImageProps & Omit<BoxProps, 'as'>> = ({
    src,
    alt,
    width,
    height,
    ...rest
}) => {
    return (
        <Box position="relative" width={width} height={height} {...rest}>
            <NextImage objectFit="cover" layout="fill" src={src} alt={alt} sizes="25vw 100vw" />
        </Box>
    );
};
