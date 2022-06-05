import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory: string = path.join(process.cwd(), 'posts');

interface Post {
    id: string;
    title: string;
    date: string;
}

export const getSortedPostsData = (): Array<Post> => {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id: string = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath: string = path.join(postsDirectory, fileName);
        const fileContents: string = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult: matter.GrayMatterFile<string> = matter(fileContents);
        const postData = matterResult.data as Post;

        // Combine the data with the id
        const post: Post = {
            ...postData,
            id
        };

        return post;
    });
    // Sort posts by date
    return allPostsData.sort((a: Post, b: Post): number => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};

export const getAllPostIds = () => {
    const fileNames: string[] = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
                lang: 'en'
            }
        };
    });
};

export async function getPostData(id: string) {
    const fullPath: string = path.join(postsDirectory, `${id}.md`);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html, { sanitize: true })
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    };
}
