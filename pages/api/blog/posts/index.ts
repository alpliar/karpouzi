import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import BlogPost, { BlogPostsData } from '../../../../graphql/models/blog/post.model';
import { GET_BLOG_POSTS } from '../../../../graphql/queries/blog/blog.posts.queries';

interface BlogPostsResponse {
    posts?: BlogPost[];
    error?: string;
}

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<BlogPostsResponse | undefined>
) => {
    try {
        const {
            data: { posts }
        } = await apolloClient.query<BlogPostsData>({
            query: GET_BLOG_POSTS
        });

        if (posts) {
            res.status(200).json({
                posts
            });
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({
            posts: [],
            error: 'Could not fetch blogposts:'
        });
    }
};

export default handler;
