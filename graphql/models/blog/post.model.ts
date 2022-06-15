import Person from '../common/person.model';
import Picture from '../common/picture.model';
import SeoProps from '../common/seo.model';
import GraphCMSSystemFields from '../common/systemFields.model';

export default interface BlogPost extends GraphCMSSystemFields {
    slug: string;
    title: string;
    subtitle: string;
    authors: Array<Person>;
    content: string;
    timeToRead: number;
    coverPicture: Picture;
    meta: SeoProps | null;
}

export interface BlogPostData {
    post: BlogPost;
}

export interface BlogPostsData {
    posts: Array<BlogPost>;
}
