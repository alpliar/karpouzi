import type { NextApiRequest, NextApiResponse } from 'next';
import apolloClient from '../../../../graphql/apollo-client';
import BlogPost, { BlogPostData } from '../../../../graphql/models/blog/post.model';
import { GET_BLOG_POST } from '../../../../graphql/queries/blog/post';

export interface BlogPostResponse {
    post?: BlogPost;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<BlogPostResponse>) => {
    try {
        const { slug } = req.query;

        const { data, error } = await apolloClient.query<BlogPostData>({
            query: GET_BLOG_POST,
            variables: { slug }
        });

        console.log(error, data);

        if (!error && data) {
            const { post } = data;

            res.status(200).json({
                post
            });
        }
    } catch (err) {
        res.status(404).json({
            error: 'Could not fetch shop product: ' + err
        });
    }
};

export default handler;
