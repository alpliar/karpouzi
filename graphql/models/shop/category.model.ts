import { Id } from '../common/types.model';

interface Asset {
    id: string;
    url: string;
    fileName: string;
    mimeType: string;
    createdAt: string;
}

interface ProductExcerpt {
    id: Id;
    name: string;
}

interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: Asset;
    description: string;
    products: Array<ProductExcerpt>;
}

export interface ShopCategoriesData {
    categories: Array<ShopCategory>;
}

export default ShopCategory;
