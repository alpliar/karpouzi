import { gql } from '@apollo/client';

export const GET_SHOP_CATEGORIES = gql`
    query GetShopCategories {
        categories: shopCategories {
            id
            slug
            name
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
            }
        }
    }
`;
