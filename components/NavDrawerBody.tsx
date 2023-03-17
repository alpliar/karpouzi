import { LinkBox, LinkOverlay, Wrap, WrapItem } from '@chakra-ui/layout';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const NavDrawerBody: React.FC = () => {
    const { formatMessage } = useIntl();

    const entries = [
        {
            href: '/shop',
            alt: formatMessage(
                { id: 'goToPageName' },
                { name: formatMessage({ id: 'menuEntryShop' }) }
            ),
            text: formatMessage({ id: 'menuEntryShop' })
        },
        {
            href: '/blog',
            alt: formatMessage(
                { id: 'goToPageName' },
                { name: formatMessage({ id: 'menuEntryBlog' }) }
            ),
            text: formatMessage({ id: 'menuEntryBlog' })
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
