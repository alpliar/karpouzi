import { LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const BackToHome = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <LinkBox as="aside">
            <Text as="span" fontStyle="italic">
                {f('feelingLost')}{' '}
                <Link legacyBehavior href="/" passHref>
                    <LinkOverlay title={f('goBackToHome')}>{f('goBackToHome')}</LinkOverlay>
                </Link>
            </Text>
        </LinkBox>
    );
};

export default BackToHome;
