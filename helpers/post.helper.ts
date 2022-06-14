import apolloClient from '../graphql/apollo-client';
import BlogPost, { BlogPostData, BlogPostsData } from '../graphql/models/blog/post.model';
import { Asset } from '../graphql/models/common/asset.model';
import { GET_BLOG_POST, GET_BLOG_POSTS } from '../graphql/queries/blog/blog.posts.queries';
import errorHandler from '../utils/errorsHandler';
import AssetHelper from './asset.helper';

export default class PostHelper {
    static getPost = async (slug: BlogPost['slug']): Promise<BlogPost> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { post }
                } = await apolloClient.query<BlogPostData>({
                    query: GET_BLOG_POST,
                    variables: {
                        slug
                    }
                });

                const newPost: BlogPost = {
                    ...post,
                    coverPicture: {
                        ...post.coverPicture,
                        asset: await AssetHelper.getAsset(post.coverPicture.asset.id)
                    }
                };

                resolve(newPost);
            } catch (anyError) {
                reject(errorHandler(anyError));
            }
        });
    };

    static getPosts = async (): Promise<Array<BlogPost>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { posts }
                } = await apolloClient.query<BlogPostsData>({
                    query: GET_BLOG_POSTS
                });

                resolve(this.resolveBlogPostsNodes(posts));
            } catch (anyError) {
                reject(errorHandler(anyError));
            }
        });
    };

    private static resolveBlogPostNodes = async (post: BlogPost): Promise<BlogPost> => {
        return new Promise(async (resolve, reject) => {
            try {
                const asset: Asset = await AssetHelper.getAsset(post.coverPicture.asset.id);
                const resolvedPost = {
                    ...post,
                    coverPicture: {
                        ...post.coverPicture,
                        asset
                    }
                };

                resolve(resolvedPost);
            } catch (anyError) {
                reject(errorHandler(anyError));
            }
        });
    };

    private static resolveBlogPostsNodes = async (
        posts: Array<BlogPost>
    ): Promise<Array<BlogPost>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const newPosts: Array<BlogPost> = await Promise.all(
                    posts.map(this.resolveBlogPostNodes)
                );

                resolve(newPosts);
            } catch (anyError) {
                reject(errorHandler(anyError));
            }
        });
    };
}
