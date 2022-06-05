import { BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/image';
import { Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { ComponentWithAs } from '@chakra-ui/system';
import { IconProps } from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import Card from './card';
import ProductCardBadge from './productCardBadge';
import Rating from './rating';

interface IProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    title: string;
    formattedPrice: string;
    isNew: boolean;
    reviewCount: number;
    rating: number;
    ratingIcon?: IconType | ComponentWithAs<'svg', IconProps>;
}

const ProductCard: React.FC<IProps> = ({
    slug,
    imageUrl,
    imageAlt,
    title,
    formattedPrice,
    isNew,
    reviewCount,
    rating,
    ratingIcon = undefined
}) => {
    const imageHeight = useBreakpointValue({ base: 64, sm: 48, md: 48, lg: 64 });

    return (
        <LinkBox>
            <Card>
                <Box
                    bg="#282828"
                    position="relative"
                    h={imageHeight}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow="hidden">
                    <Img objectFit="cover" minH={imageHeight} src={imageUrl} alt={imageAlt} />
                    {isNew && (
                        <ProductCardBadge
                            icon={isNew ? BellIcon : TriangleDownIcon}
                            text={isNew ? 'NEW' : '-20%'}
                            positionX="right"
                            positionY="top"
                        />
                    )}

                    {!isNew && (
                        <ProductCardBadge
                            icon={isNew ? BellIcon : TriangleDownIcon}
                            text={isNew ? 'NEW' : '-20%'}
                            positionX="right"
                            positionY="bottom"
                        />
                    )}
                </Box>

                <Stack spacing={2} height="full">
                    {/* <Box d="flex" alignItems="baseline">
                        <Box
                            color="white.800"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2">
                            NEW &bull; 2 baths
                        </Box>
                    </Box> */}

                    <Box fontWeight="semibold" lineHeight="tight">
                        <Link
                            passHref
                            href={{
                                pathname: '/shop/product/[slug]',
                                query: { slug }
                            }}>
                            <LinkOverlay>
                                <Heading
                                    size="md"
                                    textShadow="sm"
                                    _hover={{
                                        textShadow: '0.5px 0.5px 0.5px teal'
                                    }}>
                                    {title}
                                </Heading>
                            </LinkOverlay>
                        </Link>
                    </Box>

                    <Box>
                        <Rating rate={rating} count={reviewCount} icon={ratingIcon} />
                    </Box>

                    <Box>
                        <Text as="b" fontSize="3xl">
                            {formattedPrice}
                        </Text>
                        <Text as="span" /*color="gray.600"*/ fontSize="sm">
                            / piece
                        </Text>
                    </Box>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default ProductCard;
