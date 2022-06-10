import { Box, BoxProps, LayoutProps } from '@chakra-ui/react';
import NextImage from 'next/image';
import * as React from 'react';

interface ImageProps {
    src: string;
    alt: string;
    width: LayoutProps['width'];
    height: LayoutProps['height'];
    sizes?: string | undefined;
    priority?: boolean;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(100,100,100,0.3)" offset="20%" />
      <stop stop-color="rgba(100,100,100,0.5)" offset="50%" />
      <stop stop-color="rgba(100,100,100,0.4)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="transparent" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const Image: React.FC<ImageProps & Omit<BoxProps, 'as'>> = ({
    src,
    alt,
    width,
    height,
    sizes,
    priority = undefined,
    ...rest
}) => {
    return (
        <Box position="relative" width={width} height={height} {...rest}>
            <NextImage
                objectFit="cover"
                layout="fill"
                src={src}
                alt={alt}
                sizes={sizes}
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
                placeholder="blur"
                priority={priority}
            />
        </Box>
    );
};
