export default function handler(req, res) {
    res.status(200).json({
        totalCount: 2,
        categories: [
            { slug: 'fruits', productsCount: 10, products: [] },
            { slug: 'veggies', productsCount: 3, products: [] }
        ]
    });
}
