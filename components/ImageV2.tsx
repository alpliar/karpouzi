import { AspectRatio, AspectRatioProps } from '@chakra-ui/react';
import NextImage, { ImageProps } from 'next/image';
import React from 'react';
import { BASE_TRANSITION } from '../constants/ui/transitions';

export interface ImageV2Props {
    src: string;
    alt: string;
    blurDataURL?: string;
    priority?: boolean;
    imageProps?: Partial<ImageProps>;
}

const ImageV2: React.FC<ImageV2Props & AspectRatioProps> = ({
    src,
    alt,
    blurDataURL,
    priority,
    imageProps,
    ...rest
}) => {
    return (
        <AspectRatio ratio={1} width="full" transition={BASE_TRANSITION} {...rest}>
            <>
                <NextImage
                    alt={alt}
                    blurDataURL={blurDataURL}
                    fill
                    priority={priority}
                    quality={30}
                    // placeholder="blur" //TODO: check why this rule breaks things
                    src={src}
                    sizes={`
                        (max-width: 30em) 100vw, 
                        50vw
                    `}
                    style={{
                        objectFit: 'cover',
                        alignSelf: 'stretch'
                    }}
                    {...imageProps}
                />
                {blurDataURL}
            </>
        </AspectRatio>
    );
};

export default ImageV2;
