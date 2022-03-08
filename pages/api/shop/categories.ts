import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../reducer/server';
import { getRandomProduct } from '../products';

interface CategoryProducts {
    count: number;
    featured?: Array<Product>;
}

interface Category {
    slug: string;
    name: string;
    description: string;
    products: CategoryProducts;
}

interface CategoriesResponse {
    categories?: Category[];
}

const fakeResponse = {
    categories: [
        {
            slug: 'fruits',
            name: 'Fruits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            image: '/images/category/fruits.webp',
            products: {
                featured: [
                    getRandomProduct('fuji-apple'),
                    getRandomProduct('red-delicious-apple'),
                    getRandomProduct('mutsu-apple')
                ],
                count: 3
            }
        },
        {
            slug: 'veggies',
            name: 'Veggies',
            image: '/images/category/veggies.webp',
            description: 'Ex dolorem non soluta sit reprehenderit! Natus vitae doloribus amet?',
            products: {
                featured: [getRandomProduct('artichoke')],
                count: 1
            }
        },
        {
            slug: 'spices',
            name: 'Spices',
            image: '/images/category/spices.webp',
            description:
                'Reprehenderit, tempora excepturi tempore porro natus assumenda recusandae ipsam aliquid non velit officiis nihil, eum veritatis quaerat, corporis a totam quia rerum!',
            products: {
                featured: [getRandomProduct('green-pepper')],
                count: 1
            }
        },
        {
            slug: 'oils',
            name: 'Oils',
            image: '/images/category/oils.webp',
            description:
                'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
            products: {
                featured: [getRandomProduct('sesame-oil')],
                count: 1
            }
        },
        {
            slug: 'rices',
            name: 'Rices',
            image: '/images/category/rices.webp',
            description:
                'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
            products: {
                featured: [getRandomProduct('basmati-rice')],
                count: 1
            }
        },
        {
            slug: 'pastas',
            name: 'Pastas',
            image: '/images/category/pastas.webp',
            description:
                'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
            products: {
                featured: [
                    getRandomProduct('farfalle-pastas'),
                    getRandomProduct('fusillini-pastas'),
                    getRandomProduct('pipe-rigati-pastas'),
                    getRandomProduct('sedani-rigati-pastas'),
                    getRandomProduct('rigafoni-pastas'),
                    getRandomProduct('conchiglie-rigate-pastas'),
                    getRandomProduct('spaghetti-pastas'),
                    getRandomProduct('gnocchi-pastas')
                ],
                count: 1
            }
        }
    ]
};

export default function handler(_req: NextApiRequest, res: NextApiResponse<CategoriesResponse>) {
    res.status(200).json(fakeResponse);
}
