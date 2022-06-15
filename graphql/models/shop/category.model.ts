import GraphCMSAsset, { Asset } from '../common/asset.model';
import { Id } from '../common/types.model';
import Product, { ProductExcerpt } from './product.model';
export default interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: GraphCMSAsset;
    description: string;
}

export interface ShopCategorySlug {
    slug: ShopCategory['slug'];
}
export interface ShopCategoryWithProducts extends ShopCategory {
    products: Array<Product>;
}

export interface ShopCategoryWithProductsAndAsset extends ShopCategoryWithProducts {
    picture: Asset;
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
export interface ShopCategoriesSlugs {
    categories: Array<ShopCategorySlug>;
}
export interface ShopCategoryData {
    category: ShopCategoryWithProductsExcerpts;
}
