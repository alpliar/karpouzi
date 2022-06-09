import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import {
    ShopCategoryData,
    ShopCategoryWithProductsExcerpts
} from '../../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORY } from '../../../../graphql/queries/shop/shop.categories.queries';

export interface CategoryResponse {
    category?: ShopCategoryWithProductsExcerpts;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<CategoryResponse>) => {
    try {
        const { slug } = req.query;

        const {
            data: { category },
            error
        } = await apolloClient.query<ShopCategoryData>({
            query: GET_SHOP_CATEGORY,
            variables: { slug }
        });

        if (error) throw error;

        res.status(200).json({
            category
        });
    } catch (_err) {
        console.log(_err);
        res.status(200).json({
            error: 'Could not fetch shop category'
        });
    }
};

export default handler;
