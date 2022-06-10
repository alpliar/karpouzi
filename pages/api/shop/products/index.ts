import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../graphql/models/shop/product.model';
import ProductHelper from '../../../../helpers/product.helper';

interface ProductsResponse {
    products?: Array<Product>;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ProductsResponse>) => {
    try {
        const { slugs } = req.body;
        const products = await ProductHelper.getProducts(slugs);

        res.status(200).json({
            products
        });
    } catch {
        res.status(404).json({
            error: 'Could not fetch requested shop products'
        });
    }
};

export default handler;
