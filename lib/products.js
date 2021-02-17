import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const productsDirectory = path.join(process.cwd(), 'data', 'shop', 'products');

export function getSortedProductsData() {
    // Get file names under /products
    const fileNames = fs.readdirSync(productsDirectory);
    const allProductsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(productsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the product metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the slug
        return {
            slug,
            ...matterResult.data
        };
    });
    // Sort products by date
    return allProductsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllProductIds() {
    const fileNames = fs.readdirSync(productsDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       slug: 'apple'
    //     }
    //   },
    //   {
    //     params: {
    //       slug: 'banana'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, '')
            }
        };
    });
}

export async function getProductData(slug) {
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
    return {
        slug,
        contentHtml,
        ...matterResult.data
    };
}
