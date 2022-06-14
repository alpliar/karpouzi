import { gql } from '@apollo/client';

export const GET_BLOG_POST = gql`
    query GetBlogPost($slug: String!) {
        post: blogPost(where: { slug: $slug }) {
            id
            slug
            title
            subtitle
            content
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
            authors {
                id
                firstName
            }
            timeToRead
            publishedBy {
                id
                name
            }
            publishedAt
            updatedBy {
                id
                name
            }
            updatedAt
            createdBy {
                id
                name
            }
            createdAt
        }
    }
`;

export const GET_BLOG_POSTS = gql`
    query GetBlogPosts {
        posts: blogPosts(orderBy: createdAt_DESC) {
            id
            slug
            title
            subtitle
            content
            coverPicture {
                alternativeText
                asset {
                    id
                }
            }
            authors {
                id
                firstName
            }
            timeToRead
            publishedBy {
                id
                name
            }
            publishedAt
            updatedBy {
                id
                name
            }
            updatedAt
            createdBy {
                id
                name
            }
            createdAt
        }
    }
`;

export const GET_BLOG_POSTS_SLUGS = gql`
    query GetBlogPosts {
        blogPosts {
            slug
        }
    }
`;
