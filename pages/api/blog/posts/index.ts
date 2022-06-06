import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost, { BlogPostsData } from '../../../../graphql/models/blog/post.model';
import { GET_BLOG_POSTS } from '../../../../graphql/queries/blog/post';
import apolloClient from '../../../../graphql/apollo-client';

interface BlogPostsResponse {
    posts?: BlogPost[];
    error?: string;
}

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<BlogPostsResponse | undefined>
) => {
    const {
        data: { posts },
        errors
    } = await apolloClient.query<BlogPostsData>({
        query: GET_BLOG_POSTS
    });

    // console.log(categories);

    if (!errors && posts !== undefined) {
        res.status(200).json({
            posts
        });
    } else {
        if (errors) console.warn('KO******', errors);
        res.status(404).json({
            posts: [],
            error: 'Could not fetch blogposts: '
        });
    }
};

export default handler;
