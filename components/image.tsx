import { Box, BoxProps } from '@chakra-ui/react';
import NextImage from 'next/image';
import * as React from 'react';

interface ImageProps {
    src: string;
    alt: string;
}

export const Image: React.FC<ImageProps & Omit<BoxProps, 'as'>> = ({ src, alt, ...rest }) => {
    return (
        <Box position="relative" {...rest}>
            <NextImage objectFit="cover" layout="fill" src={src} alt={alt} />
        </Box>
    );
};
