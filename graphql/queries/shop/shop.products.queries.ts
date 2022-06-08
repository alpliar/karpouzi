import { gql } from '@apollo/client';

export const GET_SHOP_PRODUCT = gql`
    query GetShopProduct($slug: String!) {
        product(where: { slug: $slug }) {
            id
            name
            slug
            description
            coverPicture {
                alternativeText
                asset {
                    id
                    fileName
                    mimeType
                    createdAt
                    url(transformation: { image: { resize: { height: 500, width: 500 } } })
                }
            }
            picture {
                id
                url(transformation: { image: { resize: { width: 500, height: 500 } } })
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
`;

export const GET_SHOP_PRODUCTS = gql`
    query GetShopProducts {
        products {
            slug
        }
    }
`;
