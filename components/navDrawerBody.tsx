import { LinkBox, LinkOverlay, Stack, Wrap, WrapItem } from '@chakra-ui/layout';
import { useIntl } from 'react-intl';
import NavDrawerBodyItem from './navDrawerBodyItem';
import Link from 'next/link';

const NavDrawerBody = () => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const entries = [
        {
            href: '/blog',
            alt: f('goToPageName', { name: f('menuEntryBlog') }),
            text: f('menuEntryBlog')
        },
        {
            href: '/shop',
            alt: f('goToPageName', { name: f('menuEntryShop') }),
            text: f('menuEntryShop')
        }
    ];

    return (
        <Wrap spacing={4}>
            {entries.map((entry) => {
                const { href, alt, text } = entry;

                return (
                    <LinkBox
                        as={WrapItem}
                        width="full"
                        fontSize="xl"
                        cursor="pointer"
                        // _hover={{ bg: 'whiteAlpha.500' }}
                    >
                        <Link href={href}>
                            <LinkOverlay title={alt} w="full" textAlign="center">
                                {text}
                            </LinkOverlay>
                        </Link>
                    </LinkBox>
                );
            })}
        </Wrap>
    );
};

export default NavDrawerBody;

NavDrawerBody.propTypes = {};
