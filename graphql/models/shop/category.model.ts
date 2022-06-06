import Asset from '../common/asset.model';
import { Id } from '../common/types.model';
import Product from './product.model';

interface ShopCategory {
    id: Id;
    slug: string;
    name: string;
    picture: Asset;
    description: string;
    products: Array<Product>;
}

export interface ShopCategoriesData {
    categories: Array<ShopCategory>;
}
export interface ShopCategoryData {
    category: ShopCategory;
}

export default ShopCategory;
