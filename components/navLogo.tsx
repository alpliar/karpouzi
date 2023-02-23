import { Flex, LinkBox, LinkOverlay } from '@chakra-ui/layout';
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
            <Flex wrap="wrap" gap={1} fontSize="2xl" fontWeight="bold">
                <span role="img" aria-label={siteEmojiLabel}>
                    {siteEmoji}
                </span>
                <Link legacyBehavior href="/" passHref>
                    <LinkOverlay
                        title="Go to homepage"
                        whiteSpace="pre-wrap"
                        overflowWrap="anywhere">
                        {f('commonSiteName')}
                    </LinkOverlay>
                </Link>
            </Flex>
        </LinkBox>
    );
};

export default NavLogo;
