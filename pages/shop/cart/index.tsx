import { SimpleGrid } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/cartItem';
import Section from '../../../components/layout/Section';
import NoContentBanner from '../../../components/NoContentBanner';
import PageListingLayout from '../../../components/pageListingLayout';
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
                            <SimpleGrid
                                columns={{ base: 1, sm: 2, lg: 3 }}
                                spacingX="0.5em"
                                spacingY="1em">
                                {cart.map((item, index) => (
                                    <CartItem
                                        key={`${item.slug}-${index}`}
                                        slug={item.slug}
                                        quantity={item.quantity}
                                    />
                                ))}
                            </SimpleGrid>
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
