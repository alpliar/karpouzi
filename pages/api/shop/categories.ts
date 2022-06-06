import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../graphql/apollo-client';
import { ShopCategoriesData } from '../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORIES } from '../../../graphql/queries/shop';

interface Category {
    slug: string;
    name: string;
    description: string;
    image: string;
    // products: CategoryProducts;
}

interface CategoriesResponse {
    categories?: Category[];
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

    // console.log(categories);

    if (!errors && categories !== undefined) {
        res.status(200).json({
            categories: categories.map((category) => {
                const { slug, name, description, picture } = category;
                return { slug, name, description, image: picture?.url };
            })
        });
    } else {
        if (errors) console.warn('KO******', errors);
        res.status(200).json({
            categories: [],
            error: 'Could not fetch shop categories: '
        });
    }
};

export default handler;
