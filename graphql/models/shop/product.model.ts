import Asset from '../common/asset.model';
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
    picture: Asset;
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
    picture: Asset;
    prices: Array<Price>;
    reviews: Array<Review>;
}
