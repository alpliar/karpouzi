import { Id } from '../common/types.model';

interface Asset {
    id: Id;
    url: string;
    fileName: string;
    mimeType: string;
    createdAt: string;
}

interface ProductExcerpt {
    id: Id;
    name: string;
}

interface Price {
    amount: number;
    currency: 'EUR' | 'USD' | 'JPY' | 'CHF';
}

interface Product {
    name: string;
    slug: string;
    description: string;
    picture: Asset;
    prices: Array<Price>;
}

interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: Asset;
    description: string;
    products: Array<ProductExcerpt | Product>;
}

export interface ShopCategoriesData {
    categories: Array<ShopCategory>;
}
export interface ShopCategoryData {
    category: ShopCategory;
}

export default ShopCategory;
