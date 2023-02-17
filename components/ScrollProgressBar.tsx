import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion, useScroll, useSpring } from 'framer-motion';
import React from 'react';

const ScrollProgressBar: React.FC = ({}) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Box className="progress-bar-container" position="fixed" zIndex="55">
            <motion.div
                className="progress-bar"
                style={{
                    scaleX,
                    height: '10px',
                    width: '100%',
                    backgroundColor: useColorModeValue('coral', 'gold'),
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    transformOrigin: '0%'
                }}
            />
        </Box>
    );
};

export default ScrollProgressBar;
