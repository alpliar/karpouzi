import Asset from '../common/asset.model';
import { Id } from '../common/types.model';
import Product, { ProductExcerpt } from './product.model';

export interface ShopCategoryExcerpt {
    id: Id;
    slug: string;
    name: string;
    picture: Asset;
    description: string;
    products: Array<ProductExcerpt>;
}
export default interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: Asset;
    description: string;
    products: Array<Product>;
}

export interface ShopCategoriesData {
    categories: Array<ShopCategoryExcerpt>;
}
export interface ShopCategoryData {
    category: ShopCategoryExcerpt;
}
