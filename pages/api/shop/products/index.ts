import { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import { ProductSlug, ShopProductsData } from '../../../../graphql/models/shop/product.model';
import { GET_SHOP_PRODUCTS } from '../../../../graphql/queries/shop/product';

interface ProductsResponse {
    products?: Array<ProductSlug>;
    error?: string;
}

const handler = async (_req: NextApiRequest, res: NextApiResponse<ProductsResponse>) => {
    const {
        data: { products },
        errors
    } = await apolloClient.query<ShopProductsData>({
        query: GET_SHOP_PRODUCTS
    });

    if (!errors && products !== undefined) {
        res.status(200).json({
            products
        });
    } else {
        res.status(404).json({
            products: [],
            error: 'Could not fetch shop products: '
        });
    }
};

export default handler;
