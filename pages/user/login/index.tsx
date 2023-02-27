import { Container, SimpleGrid } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { useIntl } from 'react-intl';
import LoginForm from '../../../components/LoginForm';
import PageListingLayout from '../../../components/pageListingLayout';

const LoginPage: NextPage = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <PageListingLayout fullWidth title={f('signInLong')} breadcrumbs={[]}>
            <Container maxW={{ base: 'sm', md: 'md', lg: 'lg' }}>
                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 4, lg: 8 }}>
                    <LoginForm />
                </SimpleGrid>
            </Container>
        </PageListingLayout>
    );
};

export default LoginPage;
