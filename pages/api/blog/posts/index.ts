import type { NextApiRequest, NextApiResponse } from 'next';
import BlogPost from '../../../../graphql/models/blog/post.model';
import PostHelper from '../../../../helpers/post.helper';

interface BlogPostsResponse {
    posts?: BlogPost[];
    error?: string;
}

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<BlogPostsResponse | undefined>
) => {
    try {
        const posts = await PostHelper.getPosts();

        if (posts) {
            res.status(200).json({
                posts
            });
        }
    } catch {
        res.status(404).json({
            error: 'Could not fetch blogposts'
        });
    }
};

export default handler;
