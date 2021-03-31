import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, padding }) => {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'xl'}
            rounded={{ base: 'none', sm: 'md' }}
            p={padding}
            overflow={'hidden'}>
            {children}
        </Box>
    );
};

export default Card;

Card.defaultProps = {
    padding: 6
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    padding: PropTypes.number
};
