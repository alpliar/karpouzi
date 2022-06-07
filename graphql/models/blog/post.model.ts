import Asset from '../common/asset.model';
import Person from '../common/person.model';
import Picture from '../common/picture.model';
import GraphCMSSystemFields from '../common/systemFields.model';

export default interface BlogPost extends GraphCMSSystemFields {
    slug: string;
    title: string;
    subtitle: string;
    authors: Array<Person>;
    content: string;
    timeToRead: number;
    /**
     * @deprecated use coverPicture instead
     */
    picture: Asset;
    coverPicture: Picture;
}

export interface BlogPostData {
    post: BlogPost;
}

export interface BlogPostsData {
    posts: Array<BlogPost>;
}
