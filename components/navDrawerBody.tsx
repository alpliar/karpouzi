import { LinkBox, LinkOverlay, Wrap, WrapItem } from '@chakra-ui/layout';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const NavDrawerBody = () => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const entries = [
        {
            href: '/shop',
            alt: f('goToPageName', { name: f('menuEntryShop') }),
            text: f('menuEntryShop')
        },
        {
            href: '/blog',
            alt: f('goToPageName', { name: f('menuEntryBlog') }),
            text: f('menuEntryBlog')
        }
    ];

    return (
        <Wrap spacing={4}>
            {entries.map((entry) => {
                const { href, alt, text } = entry;

                return (
                    <LinkBox
                        key={href}
                        as={WrapItem}
                        width="full"
                        fontSize="xl"
                        cursor="pointer"
                        // _hover={{ bg: 'whiteAlpha.500' }}
                    >
                        <Link legacyBehavior href={href}>
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
