import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { BASE_TRANSITION } from '../constants/ui/transitions';

const Card = ({ children, padding, fullHeight }) => {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'lg'}
            rounded={{ base: 'none', sm: 'md' }}
            p={padding}
            h={fullHeight ? '100%' : null}
            overflow={'hidden'}
            _hover={{
                boxShadow: '2xl',
                transform: 'skewY(-0.25deg) scale(1.01)'
            }}
            transition={BASE_TRANSITION}>
            {children}
        </Box>
    );
};

export default Card;

Card.defaultProps = {
    padding: 6,
    fullHeight: false
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    padding: PropTypes.number,
    fullHeight: PropTypes.bool
};
