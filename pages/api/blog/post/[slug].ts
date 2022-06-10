import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost from '../../../../graphql/models/blog/post.model';
import PostHelper from '../../../../helpers/post.helper';

export interface BlogPostResponse {
    post?: BlogPost;
    error?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<BlogPostResponse>) => {
    try {
        const { slug } = req.query;

        if (typeof slug !== 'string') throw new Error('Slug is missing in params');

        const post = await PostHelper.getPost(slug);

        res.status(200).json({
            post
        });
    } catch (err) {
        res.status(404).json({
            error: `Could not fetch blog post`
        });
    }
};

export default handler;
