import { Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BackToHome from './backToHome';
import Section from './layout/Section';

const Footer = () => {
    const { formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);
    const router = useRouter();
    const isHome = router.pathname === '/';
    const copyrightMention = `© Karpouzi ${new Date().getFullYear()}`;

    return (
        <>
            <Section
                sectionPattern="rain"
                colorScheme="gray"
                title={f('bottomOfPage')}
                // description: copyrightMention,
                component={
                    <Stack>
                        {!isHome && <BackToHome />}
                        <Text>{copyrightMention}</Text>
                    </Stack>
                }
            />
        </>
    );
};

export default Footer;
