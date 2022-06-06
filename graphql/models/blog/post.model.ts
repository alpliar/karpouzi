import Asset from '../common/asset.model';
import Person from '../common/person.model';
import GraphCMSSystemFields from '../common/systemFields.model';

export default interface BlogPost extends GraphCMSSystemFields {
    slug: string;
    title: string;
    subtitle: string;
    authors: Array<Person>;
    content: string;
    timeToRead: number;
    picture: Asset;
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
