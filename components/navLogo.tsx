import { Flex, HStack, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import Link from 'next/link';
import { useIntl } from 'react-intl';

interface IProps {
    siteEmoji: string;
    siteEmojiLabel: string;
}

const NavLogo: React.FC<IProps> = ({ siteEmoji, siteEmojiLabel }) => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    return (
        <LinkBox as={Flex}>
            <HStack spacing={1} fontSize="2xl" fontWeight="bold">
                <span role="img" aria-label={siteEmojiLabel}>
                    {siteEmoji}
                </span>
                <Link legacyBehavior href="/" passHref>
                    <LinkOverlay title="Go to homepage">{f('commonSiteName')}</LinkOverlay>
                </Link>
            </HStack>
        </LinkBox>
    );
};

export default NavLogo;
