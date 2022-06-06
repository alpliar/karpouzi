import Asset from '../common/asset.model';
import { Id } from '../common/types.model';

enum MeasurementUnits {
    PER_UNIT = 'PER_UNIT',
    PER_METER = 'PER_METER',
    PER_KILOGRAM = 'PER_KILOGRAM',
    PER_LITER = 'PER_LITER'
}

export interface ProductExcerpt {
    id: Id;
    name: string;
}

export interface Price {
    amount: number;
    currency: 'EUR' | 'USD' | 'JPY' | 'CHF';
    measurementUnit: keyof typeof MeasurementUnits;
}

export default interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    picture: Asset;
    prices: Array<Price>;
}
