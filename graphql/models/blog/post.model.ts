import { Root } from 'remark-html';
import Person from '../common/person.model';
import Picture from '../common/picture.model';
import SeoProps from '../common/seo.model';
import GraphCMSSystemFields from '../common/systemFields.model';

export interface BlogPostLocalization {
    locale: string;
    title: BlogPost['title'];
    content: BlogPost['content'];
}
export interface ParsedBlogPostLocalization {
    locale: string;
    title: BlogPost['title'];
    content: Root;
}
export type BlogPostLocalizations = BlogPostLocalization[];
export type ParsedBlogPostLocalizations = ParsedBlogPostLocalization[];

export default interface BlogPost extends GraphCMSSystemFields {
    slug: string;
    title: string;
    subtitle: string;
    authors: Array<Person>;
    content: string;
    timeToRead: number;
    coverPicture: Picture;
    meta: SeoProps | null;
    localizations: BlogPostLocalizations;
}

export interface BlogPostData {
    post: BlogPost;
}

export interface BlogPostsData {
    posts: Array<BlogPost>;
}
