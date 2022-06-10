import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import Product, { ProductData } from '../../../../graphql/models/shop/product.model';
import { GET_SHOP_PRODUCT } from '../../../../graphql/queries/shop/shop.products.queries';
import { addThumbnailToProduct } from '../../../../utils/thumbnails';

export interface ProductResponse {
    product?: Product;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ProductResponse>) => {
    try {
        const { slug } = req.query;

        const {
            data: { product }
        } = await apolloClient.query<ProductData>({
            query: GET_SHOP_PRODUCT,
            variables: { slug }
        });

        const productWithPictureThumbnail = await addThumbnailToProduct(product);

        res.status(200).json({
            product: productWithPictureThumbnail
        });
    } catch (err) {
        res.status(200).json({
            error: 'Could not fetch shop product'
        });
    }
};

export default handler;
