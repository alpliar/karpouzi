import type { NextApiRequest, NextApiResponse } from 'next';
import { ShopCategoryWithProducts } from '../../../graphql/models/shop/category.model';
import CategoryHelper from '../../../helpers/category.helper';
import errorHandler from '../../../utils/errorsHandler';

export interface CategoriesResponse {
    categories?: ShopCategoryWithProducts[];
    error?: string;
}

const handler = async (_req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) => {
    try {
        const categories = await CategoryHelper.getCategories();

        res.status(200).json({
            categories
        });
    } catch (err) {
        console.error(errorHandler(err));
        res.status(404).json({
            error: 'Could not fetch shop categories'
        });
    }
};

export default handler;
