import { Img } from '@chakra-ui/image';
import { Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import Link from 'next/link';
import { ShopCategoryWithProductsAndAsset } from '../graphql/models/shop/category.model';
import Card from './card';
import { Image } from './image';

interface IProps {
    category: ShopCategoryWithProductsAndAsset;
}

const CategoryCard: React.FC<IProps> = ({ category }) => {
    // const [isHovered, setIsHovered] = useBoolean(false);
    const imageHeight = useBreakpointValue({ base: 64, sm: 48, md: 48, lg: 64 });
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '25vw' });

    // const onHover = () => {
    //     setIsHovered.toggle();
    // };

    return (
        <LinkBox>
            <Card key={category.slug} fullHeight padding={6}>
                <Box
                    bg="#282828"
                    minH={imageHeight}
                    h={imageHeight}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    overflow="hidden">
                    <Image
                        src={category.picture.url}
                        alt={category.name}
                        sizes={pictureSizes}
                        priority
                        height={imageHeight}
                        quality={100}
                        blurDataURL={category.picture.thumbnail}
                        // bg="#282828"
                        // width={{ base: 'full', sm: '100%' }}
                        // h={{ base: '100vw', sm: 'auto' }}
                        // overflow="hidden"
                    />
                    <Img
                        w="full"
                        minH={imageHeight}
                        objectFit="cover"
                        src={category.picture.url}
                        alt={`illustration for ${category.name}`}
                    />
                </Box>
                <Stack spacing={4} height="full">
                    {/* <Wrap justify="space-between" align="center"> */}
                    {/* <Box width={{ base: '100%', md: 'inherit' }}> */}
                    <Box>
                        <Link href={`/shop/category/${category.slug}`} passHref>
                            <LinkOverlay
                                title={`go to ${category.slug} category`}
                                textShadow="sm"
                                _hover={{
                                    textShadow: '0.5px 0.5px 0.5px teal'
                                }}>
                                <Heading as="h2" size="md">
                                    {category.name}
                                </Heading>
                            </LinkOverlay>
                        </Link>
                    </Box>

                    {/* <Text
                            as="span"
                            fontSize="sm"
                            fontStyle="italic"
                            display={{ base: 'block', sm: 'inline' }}>
                            {' '}
                            {productsCount} products
                        </Text> */}
                    {/* </Wrap> */}

                    <Text noOfLines={3}>{category.description}</Text>

                    {/* {productsCount > 0 && (
                        <>
                            <Divider flexGrow={1} alignItems="flex-end" />

                            <Box>
                                <Text
                                    as="span"
                                    fontSize="sm"
                                    fontStyle="italic"
                                    display={{ base: 'block', sm: 'inline' }}>
                                    {' '}
                                    {productsCount} products
                                </Text>

                                <AvatarGroup
                                    size="lg"
                                    max={useBreakpointValue({ base: 1, sm: 2, md: 4 })}>
                                    {products.map((product, index) => (
                                        <Avatar
                                            border="1px solid #dedede"
                                            src={
                                                product.imageUrl
                                                // .replace('282828', 'fff')
                                                // .replace('eae0d0', '000')
                                            }
                                            name={product.title}
                                            key={`${index}-${product.slug}`}
                                        />
                                    ))}
                                </AvatarGroup>
                            </Box>
                        </>
                    )} */}
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default CategoryCard;
