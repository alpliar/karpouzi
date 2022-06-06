import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import Product, { ProductData } from '../../../../graphql/models/shop/product.model';
import { GET_SHOP_PRODUCT } from '../../../../graphql/queries/shop/product';

export interface ProductResponse {
    product?: Product;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ProductResponse>) => {
    const { slug } = req.body;

    const { data, error } = await apolloClient.query<ProductData>({
        query: GET_SHOP_PRODUCT,
        variables: { slug }
    });

    if (!error && data) {
        const { product } = data;

        res.status(200).json({
            product
        });
    } else {
        res.status(404).json({
            error: 'Could not fetch shop product: ' + error?.message
        });
    }
};

export default handler;
