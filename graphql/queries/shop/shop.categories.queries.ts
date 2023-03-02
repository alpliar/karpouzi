import { gql } from '@apollo/client';

export const GET_SHOP_CATEGORIES_SLUGS = gql`
    query GetShopCategories {
        categories: shopCategories {
            slug
        }
    }
`;
export const GET_SHOP_CATEGORIES = gql`
    query GetShopCategories {
        categories: shopCategories(orderBy: name_ASC) {
            id
            slug
            name
            localizations {
                locale
                name
                description
            }
            picture {
                id
                fileName
                mimeType
                createdAt
                url(transformation: { image: { resize: { height: 300, width: 300 } } })
            }
            description
            products {
                id
                slug
            }
        }
    }
`;

export const GET_SHOP_CATEGORY = gql`
    query GetShopCategory($slug: String!) {
        category: shopCategory(where: { slug: $slug }) {
            name
            slug
            localizations {
                locale
                name
                description
            }
            description
            picture {
                id
                url
                fileName
                mimeType
            }
            products {
                id
                slug
            }
        }
    }
`;
