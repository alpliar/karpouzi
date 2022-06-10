import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../graphql/models/shop/product.model';
import ProductHelper from '../../../../helpers/product.helper';

export interface ProductResponse {
    product?: Product;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ProductResponse>) => {
    try {
        const { slug } = req.query;

        const product = await ProductHelper.getProduct(slug.toString());

        res.status(200).json({
            product
        });
    } catch (err) {
        res.status(404).json({
            error: 'Could not fetch shop product'
        });
    }
};

export default handler;
