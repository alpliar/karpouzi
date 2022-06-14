import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost from '../../../../graphql/models/blog/post.model';
import PostHelper from '../../../../helpers/post.helper';
import errorHandler from '../../../../utils/errorsHandler';

export interface BlogPostsResponse {
    posts?: BlogPost[];
    error?: { message: string; cause: string };
    cause?: string;
}

const handler = async (_req: NextApiRequest, res: NextApiResponse<BlogPostsResponse>) => {
    try {
        const posts = await PostHelper.getPosts();

        if (posts) {
            res.status(200).json({
                posts
            });
        }
    } catch (anyError) {
        res.status(500).json({
            error: {
                message: 'Error - Could not fetch blog posts',
                cause: errorHandler(anyError).message
            }
        });
    }
};

export default handler;
