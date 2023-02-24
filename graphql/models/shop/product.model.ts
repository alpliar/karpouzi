import GraphCMSAsset from '../common/asset.model';
import Picture from '../common/picture.model';
import { Id } from '../common/types.model';
import ShopCategory from './category.model';
import Review, { ReviewExcerpt } from '../common/review.model';
import { Root } from 'remark-html';

enum MeasurementUnits {
    PER_UNIT = 'PER_UNIT',
    PER_METER = 'PER_METER',
    PER_KILOGRAM = 'PER_KILOGRAM',
    PER_LITER = 'PER_LITER'
}

export interface ProductExcerpt {
    id: Id;
    name: string;
    slug: string;
    description: string;
    coverPicture: Picture;
    prices: Array<Price>;
    reviews: Array<ReviewExcerpt>;
}

export interface Price {
    amount: number;
    currency: 'EUR' | 'USD' | 'JPY' | 'CHF';
    measurementUnit: keyof typeof MeasurementUnits;
}

export interface ProductLocalization {
    locale: string;
    name: Product['name'];
    description: Product['description'];
}
export interface ParsedProductLocalization {
    locale: string;
    name: Product['name'];
    description: Root;
}

export type ProductLocalizations = ProductLocalization[];
export type ParsedProductLocalizations = ParsedProductLocalization[];

export default interface Product {
    id: Id;
    name: string;
    slug: string;
    description: string;
    localizations: ProductLocalizations;
    /**
     * @deprecated use coverPicture instead
     */
    picture: GraphCMSAsset;
    coverPicture: Picture;
    prices: Array<Price>;
    reviews: Array<Review>;
    productCategories: Array<ShopCategory>;
    inspiringPicture?: Picture;
}

export interface ProductData {
    product: Product;
}

export interface ProductSlug {
    slug: string;
}
export interface ShopProductSlugsData {
    products: Array<ProductSlug>;
}

export interface ShopProductsData {
    products: Array<Product>;
}

export interface GetShopProductsRequestVariables {
    slugs: Array<Product['slug']>;
}
