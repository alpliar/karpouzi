import { Box, Flex, LinkBox, LinkOverlay } from '@chakra-ui/layout';
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
            <Box fontSize="xl" fontWeight="bold">
                <span role="img" aria-label={siteEmojiLabel}>
                    {siteEmoji}
                </span>
                <Link legacyBehavior href="/" passHref>
                    <LinkOverlay title="Go to homepage">{f('commonSiteName')}</LinkOverlay>
                </Link>
            </Box>
        </LinkBox>
    );
};

export default NavLogo;
