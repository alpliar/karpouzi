import { Box, BoxProps } from '@chakra-ui/layout';
import { LayoutProps } from '@chakra-ui/styled-system';

import NextImage, { ImageProps as NextImageProps } from "next/legacy/image";
import * as React from 'react';

interface ImageProps {
    src: NextImageProps['src'];
    alt: NextImageProps['alt'];
    width?: LayoutProps['width'];
    height?: LayoutProps['height'];
    sizes?: NextImageProps['sizes'];
    priority?: NextImageProps['priority'];
    quality: NextImageProps['quality'];
    blurDataURL?: NextImageProps['blurDataURL'];
}

export const Image: React.FC<ImageProps & Omit<BoxProps, 'as'>> = ({
    src,
    alt,
    width = undefined,
    height = undefined,
    sizes,
    priority = undefined,
    quality = 75,
    blurDataURL = undefined,
    ...rest
}) => {
    return (
        <Box position="relative" width={width} height={height} {...rest}>
            <NextImage
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                src={src}
                alt={alt}
                sizes={sizes}
                blurDataURL={blurDataURL}
                placeholder={blurDataURL ? 'blur' : undefined}
                priority={priority}
                quality={quality}
            />
        </Box>
    );
};
