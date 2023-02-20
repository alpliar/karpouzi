import { Badge, Box, Center, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import NavButton from './navButton';
import Popover from './Popover';

interface IProps {
    cartCount: number;
}

const NavCart: React.FC<IProps> = ({ cartCount }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);

    const compact = useBreakpointValue({ base: true, md: false });

    return (
        <Popover
            trigger={
                <Box position="relative">
                    {cartCount > 0 && (
                        <Center
                            as={Badge}
                            height={3.5}
                            width={3.5}
                            position="absolute"
                            top={1}
                            right={compact ? 1 : undefined}
                            left={!compact ? 7 : undefined}
                            bgColor="red.400"
                            borderRadius="full"
                            boxShadow="md"
                            fontSize={{ base: '0.75rem' }}
                            variant="solid"
                            zIndex={1}>
                            {cartCount}
                        </Center>
                    )}
                    <NavButton
                        compact={compact}
                        href="/shop/cart"
                        e2e="cartCTA"
                        label={f('cart')}
                        icon={FaShoppingCart}
                        handleClick={() => {
                            // do nothing
                        }}
                    />
                    {/* <Link
                        href="/shop/cart"
                        color="currentColor"
                        // onClick={(event) => event.preventDefault()}
                        asButton
                        buttonProps={{
                            variant: 'ghost',
                            leftIcon: (
                                <Box position="relative">
                                    <Icon boxSize={5} as={FaShoppingCart} />
                                    {cartCount > 0 && (
                                        <Center
                                            as={Badge}
                                            height={3.5}
                                            width={3.5}
                                            position="absolute"
                                            top="-1"
                                            right="-1"
                                            bgColor="red.400"
                                            borderRadius="full"
                                            boxShadow="md"
                                            fontSize={{ base: '0.75rem' }}
                                            variant="solid">
                                            {cartCount}
                                        </Center>
                                    )}
                                </Box>
                            )
                        }}>
                        {f('cart')}
                    </Link> */}
                </Box>
            }>
            {cartCount > 0 ? <Text>{f('accessCart')}</Text> : <Text>{f('cartIsEmpty')}</Text>}
        </Popover>
    );
};

export default NavCart;
