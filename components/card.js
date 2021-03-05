import PropTypes from 'prop-types';
import { Box, Center, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children }) => {
    return (
        <Center py={6}>
            <Box
                maxW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                {children}
            </Box>
        </Center>
    );
};

export default Card;

Card.propTypes = {
    children: PropTypes.node
};
