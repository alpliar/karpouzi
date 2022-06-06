import Person from '../common/person.model';

export default interface BlogPost /*extends GraphCMSSystemFields */ {
    title: string;
    subtitle: string;
    authors: Array<Person>;
    content: string;
    timeToRead: number;
}

export interface BlogPostData {
    post: BlogPost;
}

export interface BlogPostSlug {
    slug: string;
}
export interface BlogPostsData {
    posts: Array<BlogPost>;
}
