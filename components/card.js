import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children }) => {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={{ base: 'none', sm: 'md' }}
            p={6}
            overflow={'hidden'}>
            {children}
        </Box>
    );
};

export default Card;

Card.propTypes = {
    children: PropTypes.node
};
