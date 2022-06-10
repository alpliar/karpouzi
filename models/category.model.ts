import ShopCategory from '../graphql/models/shop/category.model';
import Product from '../graphql/models/shop/product.model';

export default interface Category extends ShopCategory {
    products: Array<Product>;
}
