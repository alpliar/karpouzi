import { NextApiRequest, NextApiResponse } from 'next';
import { ProductSlug } from '../../../../graphql/models/shop/product.model';
import ProductHelper from '../../../../helpers/product.helper';

interface ProductsResponse {
    products?: Array<ProductSlug>;
    error?: string;
}

const handler = async (_req: NextApiRequest, res: NextApiResponse<ProductsResponse>) => {
    try {
        const products: ProductsResponse['products'] = await ProductHelper.getAllProductsSlugs();
        res.status(200).json({
            products
        });
    } catch {
        res.status(404).json({
            error: 'Could not fetch shop products slugs'
        });
    }
};

export default handler;
