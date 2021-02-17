import { getRandomProduct } from '../products';

export default function handler(req, res) {
    const {
        query: { slug }
    } = req;

    res.status(200).json({
        product: getRandomProduct(slug)
    });
}
