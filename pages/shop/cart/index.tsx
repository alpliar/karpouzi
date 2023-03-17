import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/CartItem';
import Section from '../../../components/layout/Section';
import ShopGrid from '../../../components/layout/ShopGrid';
import NoContentBanner from '../../../components/NoContentBanner';
import PageListingLayout from '../../../components/PageListingLayout';
import { RootState } from '../../../redux/reducer';

export default function CartPage() {
    const intl = useIntl();
    const { cart } = useSelector((state: RootState) => state.client.shop);

    const isCartEmpty = cart.length === 0;

    return (
        <PageListingLayout
            colorScheme={isCartEmpty ? 'orange' : 'green'}
            fullWidth
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
            titleComplement={` (${cart.length} ${intl
                .formatMessage({ id: 'products' })
                .toLocaleLowerCase()})`}>
            <Section
                colorScheme="white"
                title={intl.formatMessage({ id: 'products' })}
                component={
                    <>
                        {!isCartEmpty && (
                            <ShopGrid>
                                {cart.map((item, index) => (
                                    <CartItem
                                        key={`${item.slug}-${index}`}
                                        slug={item.slug}
                                        quantity={item.quantity}
                                    />
                                ))}
                            </ShopGrid>
                        )}

                        {isCartEmpty && (
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
                    </>
                }></Section>
        </PageListingLayout>
    );
}
