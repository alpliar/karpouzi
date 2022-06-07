import { gql } from '@apollo/client';

export const GET_BLOG_POST = gql`
    query GetBlogPost($slug: String!) {
        post: blogPost(where: { slug: $slug }) {
            id
            slug
            title
            subtitle
            content
            picture {
                id
                fileName
                mimeType
                createdAt
                url(transformation: { image: { resize: { height: 410, width: 410 } } })
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
        posts: blogPosts {
            id
            slug
            title
            subtitle
            content
            picture {
                id
                fileName
                mimeType
                createdAt
                url(transformation: { image: { resize: { height: 410, width: 410 } } })
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
