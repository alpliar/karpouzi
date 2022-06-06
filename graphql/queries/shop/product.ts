import { gql } from '@apollo/client';

export const GET_SHOP_PRODUCT = gql`
    query GetShopProduct($slug: String!) {
        product(where: { slug: $slug }) {
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
`;
