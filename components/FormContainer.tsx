import { Container, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Card from './card';

type Props = {
    children: React.ReactElement;
};

const FormContainer: React.FC<Props> = ({ children }) => {
    return (
        <Container maxW={{ base: 'sm', md: 'md', lg: 'lg' }}>
            <Card>
                <SimpleGrid columns={{ base: 1 }} spacing={{ base: 4, lg: 8 }}>
                    {children}
                </SimpleGrid>
            </Card>
        </Container>
    );
};

export default FormContainer;
