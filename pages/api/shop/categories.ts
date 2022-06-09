import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../graphql/apollo-client';
import {
    ShopCategoriesData,
    ShopCategoryWithProductsExcerpts
} from '../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORIES } from '../../../graphql/queries/shop/shop.categories.queries';
interface CategoriesResponse {
    categories?: ShopCategoryWithProductsExcerpts[];
    error?: string;
}

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<CategoriesResponse | undefined>
) => {
    try {
        const {
            data: { categories }
        } = await apolloClient.query<ShopCategoriesData>({
            query: GET_SHOP_CATEGORIES
        });

        res.status(200).json({
            categories
        });
    } catch (_err) {
        res.status(404).json({
            error: 'Could not fetch shop categories'
        });
    }
};

export default handler;
