import apolloClient from '../graphql/apollo-client';
import ShopCategory, {
    ShopCategoriesData,
    ShopCategoryData,
    ShopCategoryWithProducts
} from '../graphql/models/shop/category.model';
import {
    GET_SHOP_CATEGORIES,
    GET_SHOP_CATEGORY
} from '../graphql/queries/shop/shop.categories.queries';
import AssetHelper from './asset.helper';
import ProductHelper from './product.helper';

export default class CategoryHelper {
    static getCategory = async (slug: ShopCategory['slug']): Promise<ShopCategoryWithProducts> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { category }
                } = await apolloClient.query<ShopCategoryData>({
                    query: GET_SHOP_CATEGORY,
                    variables: { slug }
                });

                const productSlugs = category.products.map(({ slug }) => slug);
                const products = await ProductHelper.getProducts(productSlugs);

                const newCategory: ShopCategoryWithProducts = {
                    ...category,
                    picture: await AssetHelper.getAsset(category.picture.id),
                    products
                };

                resolve(newCategory);
            } catch {
                console.log('err - getCategory');
                reject(undefined);
            }
        });
    };

    static getCategories = async (): Promise<Array<ShopCategoryWithProducts>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { categories }
                } = await apolloClient.query<ShopCategoriesData>({
                    query: GET_SHOP_CATEGORIES
                });

                const newCategories: Array<ShopCategoryWithProducts> = await Promise.all(
                    categories.map(async (category) => {
                        const productSlugs = category.products.map(({ slug }) => slug);
                        const products = await ProductHelper.getProducts(productSlugs);

                        return {
                            ...category,
                            picture: await AssetHelper.getAsset(category.picture.id),
                            products
                        };
                    })
                );

                resolve(newCategories);
            } catch {
                console.log('err - getCategory');
                reject(undefined);
            }
        });
    };
}
