import apolloClient from '../graphql/apollo-client';
import ShopCategory, {
    ShopCategoryData,
    ShopCategoryWithProducts
} from '../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORY } from '../graphql/queries/shop/shop.categories.queries';
import Category from '../models/category.model';
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

                const newCategory: Category = {
                    ...category,
                    products: await ProductHelper.getProducts(
                        category.products.map(({ slug }) => slug)
                    )
                };

                resolve(newCategory);
            } catch {
                reject(undefined);
            }
        });
    };
}
