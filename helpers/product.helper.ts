import apolloClient from '../graphql/apollo-client';
import Product, {
    GetShopProductsRequestVariables,
    ProductData,
    ProductSlug,
    ShopProductsData,
    ShopProductSlugsData
} from '../graphql/models/shop/product.model';
import {
    GET_SHOP_PRODUCT,
    GET_SHOP_PRODUCTS_SLUGS
} from '../graphql/queries/shop/shop.products.queries';
import AssetHelper from './asset.helper';

export default class ProductHelper {
    static getProduct = async (slug: Product['slug']): Promise<Product> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { product }
                } = await apolloClient.query<ProductData>({
                    query: GET_SHOP_PRODUCT,
                    variables: { slug }
                });

                const newProduct: Product = {
                    ...product,
                    coverPicture: {
                        ...product.coverPicture,
                        asset: await AssetHelper.getAsset(product.coverPicture.asset.id)
                    }
                };

                resolve(newProduct);
            } catch {
                reject(undefined);
            }
        });
    };

    static getProducts = async (slugs: Array<Product['slug']>): Promise<Array<Product>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { products }
                } = await apolloClient.query<ShopProductsData, GetShopProductsRequestVariables>({
                    query: GET_SHOP_PRODUCTS_SLUGS,
                    variables: { slugs }
                });

                const newProducts: Promise<Array<Product>> = Promise.all(
                    products.map(async (prd) => {
                        const newProduct: Product = {
                            ...prd,
                            coverPicture: {
                                ...prd.coverPicture,
                                asset: await AssetHelper.getAsset(prd.coverPicture.asset.id)
                            }
                        };
                        return newProduct;
                    })
                );

                resolve(newProducts);
            } catch {
                reject(undefined);
            }
        });
    };

    static getAllProductsSlugs = async (): Promise<Array<ProductSlug>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { products }
                } = await apolloClient.query<ShopProductSlugsData>({
                    query: GET_SHOP_PRODUCTS_SLUGS
                });

                resolve(products);
            } catch {
                reject(undefined);
            }
        });
    };
}
