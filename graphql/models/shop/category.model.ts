import { Root } from 'remark-html';
import GraphCMSAsset, { Asset } from '../common/asset.model';
import { Id } from '../common/types.model';
import Product, { ProductExcerpt } from './product.model';

export interface CategoryLocalization {
    name: string;
    description: string;
    locale: string;
}
export interface ParsedCategoryLocalization {
    locale: string;
    name: Product['name'];
    description: Root;
}
export type CategoryLocalizations = CategoryLocalization[];
export type ParsedCategoryLocalizations = ParsedCategoryLocalization[];
export default interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: GraphCMSAsset;
    description: string;
    localizations: CategoryLocalizations;
}

export interface ShopCategorySlug {
    slug: ShopCategory['slug'];
}
export interface ShopCategoryWithProducts extends ShopCategory {
    products: Array<Product>;
}

export interface ShopCategoryWithAsset extends ShopCategory {
    picture: Asset;
}

export interface ShopCategoryWithPartialProducts extends ShopCategory {
    products: Array<{ id: string; slug: string }>;
}

export type ShopCategoryWithAssetAndPartialProducts = ShopCategory &
    ShopCategoryWithAsset &
    ShopCategoryWithPartialProducts;

export interface ShopCategoryWithProductsAndAsset extends ShopCategoryWithProducts {
    picture: Asset;
}
export interface ShopCategoryWithProductsExcerpts extends ShopCategory, ShopCategory {
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
