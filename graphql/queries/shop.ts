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

export const GET_SHOP_CATEGORY = gql`
    query GetShopCategory($slug: String!) {
        category: shopCategory(where: { slug: $slug }) {
            name
            slug
            description
            picture {
                id
                fileName
                mimeType
                createdAt
                url(transformation: { image: { resize: { height: 300, width: 300 } } })
            }
            products {
                id
                name
                slug
                description
                picture {
                    id
                    url(transformation: { image: { resize: { width: 300, height: 300 } } })
                    fileName
                    mimeType
                }
                prices {
                    amount
                    currency
                    measurementUnit
                }
                reviews {
                    id
                    author {
                        firstName
                        postalAddress {
                            countryName
                        }
                    }
                    message
                    rating
                    isVerified
                }
            }
        }
    }
`;
