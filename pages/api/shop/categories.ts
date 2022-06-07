import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../graphql/apollo-client';
import {
    ShopCategoriesData,
    ShopCategoryExcerpt
} from '../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORIES } from '../../../graphql/queries/shop/shop.categories.queries';
interface CategoriesResponse {
    categories?: ShopCategoryExcerpt[];
    error?: string;
}

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<CategoriesResponse | undefined>
) => {
    const {
        data: { categories },
        errors
    } = await apolloClient.query<ShopCategoriesData>({
        query: GET_SHOP_CATEGORIES
    });

    if (!errors && categories !== undefined) {
        res.status(200).json({
            categories
        });
    } else {
        if (errors) console.warn('KO******', errors);
        res.status(404).json({
            categories: [],
            error: 'Could not fetch shop categories: '
        });
    }
};

export default handler;
