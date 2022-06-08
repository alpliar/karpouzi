import Asset from '../common/asset.model';
import Picture from '../common/picture.model';
import { Id } from '../common/types.model';
import Review, { ReviewExcerpt } from './review.model';

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
    /**
     * @deprecated use coverPicture instead
     */
    picture: Asset;
    coverPicture: Picture;
    prices: Array<Price>;
    reviews: Array<ReviewExcerpt>;
}

export interface Price {
    amount: number;
    currency: 'EUR' | 'USD' | 'JPY' | 'CHF';
    measurementUnit: keyof typeof MeasurementUnits;
}

export default interface Product {
    id: Id;
    name: string;
    slug: string;
    description: string;
    /**
     * @deprecated use coverPicture instead
     */
    picture: Asset;
    coverPicture: Picture;
    prices: Array<Price>;
    reviews: Array<Review>;
}

export interface ProductData {
    product: Product;
}

export interface ProductSlug {
    slug: string;
}
export interface ShopProductsData {
    products: Array<ProductSlug>;
}
