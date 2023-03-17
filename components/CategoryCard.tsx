import { Box, Flex, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { ShopCategoryWithAssetAndPartialProducts } from '../graphql/models/shop/category.model';
import Card from './Card';
import ImageV2 from './ImageV2';

interface IProps {
    category: ShopCategoryWithAssetAndPartialProducts;
}

const CategoryCard: React.FC<IProps> = ({ category }) => {
    const router = useRouter();
    const { formatMessage } = useIntl();

    const localization = category.localizations.find((i18n) => i18n.locale === router.locale);
    const categoryName = localization?.name || category.name;
    // const categoryDescription = localization?.description || category.description;

    const cardPadding = { base: 4, sm: 6, xl: 8 };
    const negativeCardPadding = {
        base: -cardPadding.base,
        sm: -cardPadding.sm,
        xl: -cardPadding.xl
    };

    return (
        <LinkBox>
            <Card key={category.slug} fullHeight padding={cardPadding}>
                <Flex direction="column" height="100%">
                    <Box
                        position="relative"
                        mt={negativeCardPadding}
                        mx={negativeCardPadding}
                        overflow="hidden">
                        <ImageV2
                            alt={categoryName}
                            blurDataURL={category.picture.thumbnail}
                            imageProps={{
                                quality: 1
                            }}
                            priority
                            src={category.picture.url}
                        />
                    </Box>
                    <Stack spacing={{ base: 1 }} flexGrow={1} pt={cardPadding}>
                        <Box flexGrow={1}>
                            <Link legacyBehavior href={`/shop/category/${category.slug}`} passHref>
                                <Flex
                                    wrap="wrap"
                                    as={LinkOverlay}
                                    gap={2}
                                    title={`go to ${category.slug} category`}
                                    textShadow="sm"
                                    _hover={{
                                        textDecoration: 'underline'
                                    }}>
                                    <Heading as="h2" size={{ base: 'xs', md: 'sm' }}>
                                        {categoryName}
                                    </Heading>
                                    <Text
                                        as="span"
                                        fontSize="xs"
                                        fontWeight="normal"
                                        display="inline-block"
                                        textDecoration="none">
                                        {` (${category.products.length} ${formatMessage({
                                            id: 'products'
                                        }).toLocaleLowerCase()})`}
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                    </Stack>
                </Flex>
            </Card>
        </LinkBox>
    );
};

export default CategoryCard;
