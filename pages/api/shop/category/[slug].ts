import type { NextApiRequest, NextApiResponse } from 'next';
import { ShopCategoryWithProducts } from '../../../../graphql/models/shop/category.model';
import CategoryHelper from '../../../../helpers/category.helper';

export interface CategoryResponse {
    category?: ShopCategoryWithProducts;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<CategoryResponse>) => {
    try {
        const { slug } = req.query;

        if (typeof slug !== 'string') throw new Error('Slug is missing in params');

        const category = await CategoryHelper.getCategory(slug);

        res.status(200).json({
            category
        });
    } catch (_err) {
        res.status(404).json({
            error: 'Could not fetch shop category'
        });
    }
};

export default handler;
