import { Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShopCategoryWithProductsAndAsset } from '../graphql/models/shop/category.model';
import Card from './card';
import { Image } from './image';

interface IProps {
    category: ShopCategoryWithProductsAndAsset;
}

const CategoryCard: React.FC<IProps> = ({ category }) => {
    const router = useRouter();
    const imageHeight = useBreakpointValue({ base: 64, sm: 48, md: 48, lg: 64 });
    const pictureSizes = useBreakpointValue({ base: '320px', md: '640px' });

    const localization = category.localizations.find((i18n) => i18n.locale === router.locale);
    const categoryName = localization?.name || category.name;
    const categoryDescription = localization?.description || category.description;

    return (
        <LinkBox>
            <Card key={category.slug} fullHeight padding={6}>
                <Box minH={imageHeight} h={imageHeight} mt={-6} mx={-6} mb={6} overflow="hidden">
                    <Image
                        src={category.picture.url}
                        alt={categoryName}
                        sizes={pictureSizes}
                        priority
                        height={imageHeight}
                        quality={80}
                        blurDataURL={category.picture.thumbnail}
                    />
                </Box>
                <Stack spacing={4} height="full">
                    <Box>
                        <Link legacyBehavior href={`/shop/category/${category.slug}`} passHref>
                            <LinkOverlay
                                title={`go to ${category.slug} category`}
                                textShadow="sm"
                                _hover={{
                                    textShadow: '0.5px 0.5px 0.5px teal'
                                }}>
                                <Heading as="h2" size="md">
                                    {categoryName}
                                </Heading>
                            </LinkOverlay>
                        </Link>
                    </Box>

                    <Text noOfLines={3}>{categoryDescription}</Text>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default CategoryCard;
