import { getRandomProduct } from './products';

export default function handler(req, res) {
    res.status(200).json({
        product: getRandomProduct()
    });
}
