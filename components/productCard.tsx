import { BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { IconProps } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { useIntl } from 'react-intl';
import Product from '../graphql/models/shop/product.model';
import Card from './card';
import { Image } from './image';
import ProductCardBadge from './productCardBadge';
import Rating from './rating';

interface IProps {
    // slug: string;
    // imageUrl: string;
    // imageAlt: string;
    // title: string;
    // formattedPrice: string;
    // isNew: boolean;
    // reviewCount: number;
    // rating: number;
    product: Product;
    ratingIcon?: IconType | ComponentWithAs<'svg', IconProps>;
}

const ProductCard: React.FC<IProps> = ({ product, ratingIcon = undefined }) => {
    const { formatNumber } = useIntl();
    const imageHeight = useBreakpointValue({ base: 64 /*, sm: 48, md: 48, lg: 64  */ });
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '33vw' });

    // const fallbackPicture = '';
    const isNew = true;
    const price = product.prices.find(({ currency }) => currency === 'EUR');
    const formattedPrice =
        formatNumber(Number(price?.amount), {
            style: 'currency',
            currency: price?.currency
        }) || '???';
    const reviewCount = product.reviews.length;
    const rating =
        product.reviews.map((rev) => rev.rating).reduce((a, b) => a + b, 0) / reviewCount;
    const measurementUnit = price?.measurementUnit;

    return (
        <LinkBox>
            <Card>
                <Box
                    position="relative"
                    h={imageHeight}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow="hidden">
                    {/* <Img
                        objectFit="cover"
                        minH={imageHeight}
                        src={product.coverPicture.asset.url || fallbackPicture}
                        alt={product.coverPicture.alternativeText}
                    /> */}
                    <Image
                        src={product.coverPicture.asset.url}
                        alt={product.coverPicture.alternativeText}
                        sizes={pictureSizes}
                        priority
                        height={imageHeight}
                        quality={100}
                        blurDataURL={product.coverPicture.asset.thumbnail}
                        // bg="#282828"
                        // width={{ base: 'full', sm: '100%' }}
                        // h={{ base: '100vw', sm: 'auto' }}
                        // overflow="hidden"
                    />
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
                            legacyBehavior
                            passHref
                            href={{
                                pathname: '/shop/product/[slug]',
                                query: { slug: product.slug }
                            }}>
                            <LinkOverlay
                                _hover={{
                                    textShadow: '0.5px 0.5px 0.5px teal'
                                }}>
                                <Heading size="md" textShadow="sm">
                                    {product.name}
                                </Heading>
                            </LinkOverlay>
                        </Link>
                    </Box>

                    <Box>
                        <Rating
                            rate={reviewCount > 0 ? rating : undefined}
                            count={reviewCount > 0 ? reviewCount : undefined}
                            icon={ratingIcon}
                        />
                    </Box>

                    <Box>
                        <Text as="b" fontSize="2xl">
                            {formattedPrice}
                        </Text>
                        {` `}
                        <Text as="span" fontSize="2xs">
                            {measurementUnit}
                        </Text>
                    </Box>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default ProductCard;
