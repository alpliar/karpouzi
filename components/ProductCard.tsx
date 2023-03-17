import { BellIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { IconProps } from '@chakra-ui/react';
import { ComponentWithAs, useColorModeValue } from '@chakra-ui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { FaUsers } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import Product from '../graphql/models/shop/product.model';
import DateHelper from '../helpers/date.helper';
import Card from './Card';
import ImageV2 from './ImageV2';
import ProductCardBadge from './ProductCardBadge';

interface IProps {
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
                        mt={negativeCardPadding}
                        mx={negativeCardPadding}
                        mb={cardPadding}
                        overflow="hidden">
                        <ImageV2
                            src={product.coverPicture.asset.url}
                            alt={product.coverPicture.alternativeText}
                            priority
                            blurDataURL={product.coverPicture.asset.thumbnail}
                        />

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
                                    <Heading size={{ base: 'xs', md: 'sm' }} flexGrow={1}>
                                        {productName}
                                    </Heading>
                                </LinkOverlay>
                            </Link>
                        </Box>

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
