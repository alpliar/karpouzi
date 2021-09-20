import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const productsDirectory: string = path.join(process.cwd(), 'data', 'shop', 'products');

interface Product {
    slug: string;
    title: string;
    date: string;
    price: string;
    rating: number;
    reviewCount: number;
    isNew: boolean;
    imageUrl: string;
    contentHtml: string;
}

export const getSortedProductData = () => {
    // Get file names under /products
    const fileNames: string[] = fs.readdirSync(productsDirectory);
    const allProductsData: any = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug: string = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath: string = path.join(productsDirectory, fileName);
        const fileContents: string = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the product metadata section
        const matterResult: matter.GrayMatterFile<string> = matter(fileContents);

        // Combine the data with the slug
        return {
            slug,
            ...matterResult.data
        };
    });
    // Sort products by date
    return allProductsData.sort((a: Product, b: Product) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};

export const getAllProductIds = () => {
    const fileNames: string[] = fs.readdirSync(productsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
                lang: 'en'
            }
        };
    });
};

export const getProductData = async (slug: string): Promise<Product> => {
    const fullPath = path.join(productsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the product metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html, { sanitize: true })
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
    const { title, date, price, rating, reviewCount, isNew, imageUrl } = matterResult.data;

    return {
        slug,
        contentHtml,
        title,
        date,
        price,
        rating,
        reviewCount,
        isNew,
        imageUrl
    };
};
