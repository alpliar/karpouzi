import { BellIcon } from '@chakra-ui/icons';
import {
    AspectRatio,
    Box,
    Flex,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack,
    Text
} from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { IconProps } from '@chakra-ui/react';
import { ComponentWithAs, useColorModeValue } from '@chakra-ui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { FaUsers } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import Product from '../graphql/models/shop/product.model';
import DateHelper from '../helpers/date.helper';
import Card from './card';
import { Image } from './image';
import ProductCardBadge from './productCardBadge';

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
    const imageHeight = useBreakpointValue({ base: 64 /*, sm: 48, md: 48, lg: 64  */ });
    const pictureSizes = useBreakpointValue({ base: '320px', md: '640px' });

    const localization = product.localizations?.find((i18n) => i18n.locale === router.locale);
    const productName = localization?.name || product.name;

    const isNew = DateHelper.isNew(product.createdAt);

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

    const cardPadding = { base: 2, sm: 4, md: 6 };
    const negativeCardPadding = {
        base: -cardPadding.base,
        sm: -cardPadding.sm,
        md: -cardPadding.md
    };

    return (
        <LinkBox>
            <Card
                fullHeight
                hoverBg={useColorModeValue(`${product.colorScheme}.50`, 'undefined')}
                padding={cardPadding}>
                <Flex direction="column" height="100%">
                    <Box
                        position="relative"
                        // h={imageHeight}
                        mt={negativeCardPadding}
                        mx={negativeCardPadding}
                        mb={cardPadding}
                        overflow="hidden">
                        <AspectRatio ratio={1}>
                            <Image
                                src={product.coverPicture.asset.url}
                                alt={product.coverPicture.alternativeText}
                                sizes={pictureSizes}
                                priority
                                height={imageHeight}
                                quality={90}
                                blurDataURL={product.coverPicture.asset.thumbnail}
                            />
                        </AspectRatio>

                        {isNew && (
                            <ProductCardBadge
                                icon={BellIcon}
                                text={formatMessage({ id: 'new' })}
                                positionX="right"
                                positionY="bottom"
                            />
                        )}

                        {product.reviews.length > 0 && (
                            <ProductCardBadge
                                icon={ratingIcon || FaUsers}
                                text={`${Math.round(rating / 20)}/5`}
                                positionX="right"
                                positionY="top"
                                colorScheme={product.colorScheme || 'gray'}
                            />
                        )}
                    </Box>

                    <Stack spacing={2} flexGrow={1}>
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
                                        textDecoration: 'underline'
                                    }}>
                                    <Heading
                                        size={{ base: 'xs', md: 'sm' }}
                                        // textShadow="sm"
                                        flexGrow={1}>
                                        {productName}
                                    </Heading>
                                </LinkOverlay>
                            </Link>
                        </Box>

                        {/* <Rating rate={rating} count={reviewCount} icon={ratingIcon} /> */}

                        <Flex wrap="wrap" align="baseline" columnGap={1} rowGap={0}>
                            <Text as="b" fontSize={{ base: 'md', xl: 'lg' }}>
                                {formattedPrice}
                            </Text>
                            {` `}
                            <Text as="span" fontSize={{ base: '3xs', sm: '2xs' }}>
                                {formatMessage({ id: measurementUnit as string })}
                            </Text>
                            {priceSlot && <Box>{priceSlot}</Box>}
                        </Flex>
                    </Stack>
                </Flex>
            </Card>
        </LinkBox>
    );
};

export default ProductCard;
