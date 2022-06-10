import { getPlaiceholder } from 'plaiceholder';
import ShopCategory, { ShopCategoryWithProducts } from '../graphql/models/shop/category.model';
import Product from '../graphql/models/shop/product.model';

export const addThumbnailToProduct = async (product: Product): Promise<Product> => {
    const { base64 } = await getPlaiceholder(product.coverPicture.asset.url);
    return {
        ...product,

        coverPicture: {
            ...product.coverPicture,
            asset: {
                ...product.coverPicture.asset,
                thumbnail: base64
            }
        }
    };
};

export const addThumbnailToCategory = async (
    category: ShopCategoryWithProducts
): Promise<ShopCategoryWithProducts> => {
    const { base64 } = await getPlaiceholder(category.picture.url);

    // const getProductsWithThumbnails = async (products: Product[]): Promise<Product[]> => {
    //     return await products.map(async (product) => await addThumbnailToProduct(product));
    // };

    const productsWithThumbnails = async () => {
        return category.products.map(async (product) => await addThumbnailToProduct(product));
    };

    // const newProducts = category.products.map(async (prd) => {
    //     const { base64 } = await getPlaiceholder(category.picture.url);
    //     const newProduct: Product = {
    //         ...prd,
    //         coverPicture: {
    //             ...prd.coverPicture,
    //             asset: {
    //                 ...prd.coverPicture.asset,
    //                 thumbnail: base64
    //             }
    //         }
    //     };
    //     return newProduct;
    // });

    return {
        ...category,
        picture: {
            ...category.picture,
            thumbnail: base64
        },
        products: await productsWithThumbnails()
    };
};
