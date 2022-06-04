import { Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/cartItem';
import PageListingLayout from '../../../components/pageListingLayout';
import ShopStat from '../../../components/shopStat';
import { RootState } from '../../../reducer';

export default function CartPage() {
    const { cart } = useSelector((state: RootState) => state.client);

    return (
        <PageListingLayout
            title="Cart"
            breadcrumbs={[
                {
                    text: 'Shop',
                    link: '/shop',
                    alt: 'go to shop home',
                    isCurrentPage: false
                },
                { text: 'Cart', link: '', alt: '', isCurrentPage: true }
            ]}
            titleSlot={<ShopStat label="Items" number={cart.length} />}>
            {cart.length > 0 && (
                <SimpleGrid
                    minChildWidth={{ base: 'full', md: '450px' }}
                    spacingX="0.5em"
                    spacingY="1em">
                    {cart.map((item, index) => (
                        <CartItem
                            key={`${item.slug}-${index}`}
                            title={item.slug}
                            quantity={item.quantity}
                        />
                    ))}
                </SimpleGrid>
            )}

            {cart.length === 0 && (
                <Alert status="info">
                    <AlertIcon />
                    You don&rsquo;t have any product in your cart !
                </Alert>
            )}
        </PageListingLayout>
    );
}
