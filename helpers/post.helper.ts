import apolloClient from '../graphql/apollo-client';
import BlogPost, { BlogPostData, BlogPostsData } from '../graphql/models/blog/post.model';
import { Asset } from '../graphql/models/common/asset.model';
import { GET_BLOG_POST, GET_BLOG_POSTS } from '../graphql/queries/blog/blog.posts.queries';
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
            } catch {
                console.log('err - getPost');
                reject(undefined);
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

                const newPosts: BlogPost[] = await Promise.all(
                    posts.map(async (post) => {
                        const asset: Asset = await AssetHelper.getAsset(post.coverPicture.asset.id);
                        return {
                            ...post,
                            coverPicture: {
                                ...post.coverPicture,
                                asset
                            }
                        };
                    })
                );

                resolve(newPosts);
            } catch {
                console.log('err - getPosts');
                reject(undefined);
            }
        });
    };
}
