import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../graphql/apollo-client';
import { ShopCategoriesData } from '../../../graphql/models/shop/category.model';
import { GET_SHOP_CATEGORIES } from '../../../graphql/queries/product';

// interface CategoryProducts {
//     count: number;
//     featured?: Array<Product>;
// }

interface Category {
    slug: string;
    name: string;
    description: string;
    image: string;
    // products: CategoryProducts;
}

interface CategoriesResponse {
    categories?: Category[];
    error?: string;
}

// const fakeResponse = {
//     categories: [
//         {
//             slug: 'fruits',
//             name: 'Fruits',
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//             image: '/images/category/fruits.webp',
//             products: {
//                 featured: [
//                     getRandomProduct('fuji-apple'),
//                     getRandomProduct('red-delicious-apple'),
//                     getRandomProduct('mutsu-apple')
//                 ],
//                 count: 3
//             }
//         },
//         {
//             slug: 'veggies',
//             name: 'Veggies',
//             image: '/images/category/veggies.webp',
//             description: 'Ex dolorem non soluta sit reprehenderit! Natus vitae doloribus amet?',
//             products: {
//                 featured: [getRandomProduct('artichoke')],
//                 count: 1
//             }
//         },
//         {
//             slug: 'spices',
//             name: 'Spices',
//             image: '/images/category/spices.webp',
//             description:
//                 'Reprehenderit, tempora excepturi tempore porro natus assumenda recusandae ipsam aliquid non velit officiis nihil, eum veritatis quaerat, corporis a totam quia rerum!',
//             products: {
//                 featured: [getRandomProduct('green-pepper')],
//                 count: 1
//             }
//         },
//         {
//             slug: 'oils',
//             name: 'Oils',
//             image: '/images/category/oils.webp',
//             description:
//                 'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
//             products: {
//                 featured: [getRandomProduct('sesame-oil')],
//                 count: 1
//             }
//         },
//         {
//             slug: 'rices',
//             name: 'Rices',
//             image: '/images/category/rices.webp',
//             description:
//                 'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
//             products: {
//                 featured: [getRandomProduct('basmati-rice')],
//                 count: 1
//             }
//         },
//         {
//             slug: 'pastas',
//             name: 'Pastas',
//             image: '/images/category/pastas.webp',
//             description:
//                 'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
//             products: {
//                 featured: [
//                     getRandomProduct('farfalle-pastas'),
//                     getRandomProduct('fusillini-pastas'),
//                     getRandomProduct('pipe-rigati-pastas'),
//                     getRandomProduct('sedani-rigati-pastas'),
//                     getRandomProduct('rigafoni-pastas'),
//                     getRandomProduct('conchiglie-rigate-pastas'),
//                     getRandomProduct('spaghetti-pastas'),
//                     getRandomProduct('gnocchi-pastas')
//                 ],
//                 count: 1
//             }
//         }
//     ]
// };

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<CategoriesResponse | undefined>
) => {
    const {
        data: { categories },
        errors
    } = await apolloClient.query<ShopCategoriesData>({
        query: GET_SHOP_CATEGORIES
    });

    // console.log(categories);

    if (!errors && categories !== undefined) {
        res.status(200).json({
            categories: categories.map((category) => {
                console.log(category.picture);
                const { slug, name, description, picture } = category;
                return { slug, name, description, image: picture?.url };
            })
        });
    } else {
        if (errors) console.warn('KO******', errors);
        res.status(200).json({
            categories: [],
            error: 'Could not fetch shop categories: '
        });
    }
};

export default handler;
