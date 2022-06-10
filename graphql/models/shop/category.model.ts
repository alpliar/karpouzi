import GraphCMSAsset from '../common/asset.model';
import { Id } from '../common/types.model';
import Product, { ProductExcerpt } from './product.model';
export default interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: GraphCMSAsset;
    description: string;
}
export interface ShopCategoryWithProducts extends ShopCategory {
    products: Array<Product>;
}
export interface ShopCategoryWithProductsExcerpts extends ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: GraphCMSAsset;
    description: string;
    products: Array<ProductExcerpt>;
}

export interface ShopCategoriesData {
    categories: Array<ShopCategoryWithProductsExcerpts>;
}
export interface ShopCategoryData {
    category: ShopCategoryWithProductsExcerpts;
}
