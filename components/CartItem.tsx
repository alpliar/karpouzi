import { Highlight, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { API_BASE_URL } from '../constants/api';
import Product, { Price } from '../graphql/models/shop/product.model';
import CartItemActions from './CartItemActions';
import ProductCard from './ProductCard';

interface IProps {
    slug: string;
    quantity: number;
}

const CartItem: React.FC<IProps> = ({ slug, quantity }) => {
    const { formatNumber } = useIntl();

    const [product, setProduct] = useState<Product | null>(null);
    const firstPrice = product?.prices[0] as Price;
    const formattedPrice = firstPrice
        ? formatNumber(firstPrice.amount * quantity, {
              style: 'currency',
              currency: firstPrice.currency
          })
        : '???';

    useEffect(() => {
        fetch(API_BASE_URL + `/shop/product/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
            });
    }, [slug]);

    if (!product) return null;

    return (
        <>
            <ProductCard
                product={product}
                priceSlot={
                    <Stack>
                        {firstPrice && (
                            <>
                                <Text fontSize="2xl" fontWeight="bold">
                                    <Highlight
                                        query={formattedPrice}
                                        styles={{
                                            px: '2',
                                            py: '1',
                                            rounded: 'full',
                                            bg: 'green.100'
                                        }}>
                                        {`x${quantity} = ${formattedPrice}`}
                                    </Highlight>
                                </Text>
                            </>
                        )}
                        <CartItemActions slug={slug} quantity={quantity} />
                    </Stack>
                }
            />
        </>
    );
};

export default CartItem;
