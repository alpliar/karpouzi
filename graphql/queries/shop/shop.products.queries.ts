import { gql } from '@apollo/client';

export const GET_SHOP_PRODUCT = gql`
    query GetShopProduct($slug: String!) {
        product(where: { slug: $slug }) {
            id
            name
            slug
            description
            localizations {
                locale
                name
                description
            }
            coverPicture {
                alternativeText
                asset {
                    id
                    fileName
                    mimeType
                    createdAt
                    url
                }
            }
            inspiringPicture {
                alternativeText
                asset {
                    id
                    fileName
                    mimeType
                    createdAt
                    url
                }
            }
            picture {
                id
                url
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
                createdAt
            }
            productCategories {
                id
                slug
                name
                picture {
                    id
                    url
                    fileName
                    mimeType
                }
                description
            }
        }
    }
`;

export const GET_SHOP_PRODUCTS = gql`
    query GetShopProducts($slugs: [String!]) {
        products(where: { slug_in: $slugs }) {
            id
            name
            slug
            description
            localizations {
                locale
                name
                description
            }
            coverPicture {
                alternativeText
                asset {
                    id
                    fileName
                    mimeType
                    createdAt
                    url
                }
            }
            inspiringPicture {
                alternativeText
                asset {
                    id
                    fileName
                    mimeType
                    createdAt
                    url
                }
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
            productCategories {
                id
                slug
                name
                picture {
                    id
                    url
                    fileName
                    mimeType
                }
                description
            }
        }
    }
`;

export const GET_SHOP_PRODUCTS_SLUGS = gql`
    query GetShopProductsSlugs {
        products {
            slug
        }
    }
`;
