import { SimpleGrid } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/cartItem';
import NoContentBanner from '../../../components/NoContentBanner';
import PageListingLayout from '../../../components/pageListingLayout';
import ShopStat from '../../../components/shopStat';
import { RootState } from '../../../redux/reducer';

export default function CartPage() {
    const intl = useIntl();
    const { cart } = useSelector((state: RootState) => state.client.shop);

    return (
        <PageListingLayout
            title={intl.formatMessage({ id: 'title' })}
            breadcrumbs={[
                {
                    text: intl.formatMessage({ id: 'menuEntryShop' }),
                    link: '/shop',
                    alt: intl.formatMessage(
                        { id: 'goToPageName' },
                        { name: intl.formatMessage({ id: 'menuEntryShop' }) }
                    ),
                    isCurrentPage: false
                },
                {
                    text: intl.formatMessage({ id: 'title' }),
                    link: '',
                    alt: '',
                    isCurrentPage: true
                }
            ]}
            titleSlot={
                <ShopStat label={intl.formatMessage({ id: 'products' })} number={cart.length} />
            }>
            {cart.length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="0.5em" spacingY="1em">
                    {cart.map((item, index) => (
                        <CartItem
                            key={`${item.slug}-${index}`}
                            slug={item.slug}
                            quantity={item.quantity}
                        />
                    ))}
                </SimpleGrid>
            )}

            {cart.length === 0 && (
                <NoContentBanner
                    text={intl.formatMessage({ id: 'cartEmpty' })}
                    helperText={intl.formatMessage({ id: 'sinceYoureHere' })}
                    links={[
                        {
                            href: '/shop',
                            text: intl.formatMessage(
                                { id: 'goToPageName' },
                                { name: intl.formatMessage({ id: 'menuEntryShop' }) }
                            )
                        }
                    ]}
                />
            )}
        </PageListingLayout>
    );
}
