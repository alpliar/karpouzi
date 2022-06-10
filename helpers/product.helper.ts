import apolloClient from '../graphql/apollo-client';
import Product, { ProductData } from '../graphql/models/shop/product.model';
import { GET_SHOP_PRODUCT } from '../graphql/queries/shop/shop.products.queries';
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
}
