import { BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { IconProps } from '@chakra-ui/react';
import { ComponentWithAs } from '@chakra-ui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    priceSlot?: React.ReactElement;
}

const ProductCard: React.FC<IProps> = ({
    product,
    ratingIcon = undefined,
    priceSlot = undefined
}) => {
    const router = useRouter();
    const { formatNumber, formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);
    const imageHeight = useBreakpointValue({ base: 64 /*, sm: 48, md: 48, lg: 64  */ });
    const pictureSizes = useBreakpointValue({ base: '320px', md: '640px' });

    const localization = product.localizations?.find((i18n) => i18n.locale === router.locale);
    const productName = localization?.name || product.name;

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
            <Card fullHeight hoverBg={`${product.colorScheme}.50`}>
                <Flex direction="column" height="100%">
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
                            quality={90}
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

                    <Stack spacing={2} flexGrow={1}>
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

                        <Box fontWeight="semibold" lineHeight="tight" flexGrow={1}>
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
                                    <Heading size="md" textShadow="sm" flexGrow={1}>
                                        {productName}
                                    </Heading>
                                </LinkOverlay>
                            </Link>
                        </Box>

                        <Box>
                            <Rating rate={rating} count={reviewCount} icon={ratingIcon} />
                        </Box>

                        <Box>
                            <Text as="b" fontSize="2xl">
                                {formattedPrice}
                            </Text>
                            {` `}
                            <Text as="span" fontSize="2xs">
                                {f(measurementUnit as string)}
                            </Text>
                            {priceSlot && <Box>{priceSlot}</Box>}
                        </Box>
                    </Stack>
                </Flex>
            </Card>
        </LinkBox>
    );
};

export default ProductCard;
