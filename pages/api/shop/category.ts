import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../graphql/apollo-client';
import { ShopCategoryData, ShopCategoryExcerpt } from '../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORY } from '../../../graphql/queries/shop';

export interface CategoryResponse {
    category?: ShopCategoryExcerpt;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<CategoryResponse>) => {
    const { slug } = req.body;

    const { data, error } = await apolloClient.query<ShopCategoryData>({
        query: GET_SHOP_CATEGORY,
        variables: { slug }
    });

    if (!error && data) {
        const { category } = data;

        res.status(200).json({
            category
        });
    } else {
        res.status(200).json({
            error: 'Could not fetch shop category: ' + error?.message
        });
    }
};

export default handler;
