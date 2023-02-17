import { chakra } from '@chakra-ui/react';
import { isValidMotionProp, motion, useScroll, useSpring } from 'framer-motion';
import React from 'react';

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp
});

const ScrollProgressBar: React.FC = ({}) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <ChakraBox
            className="progress-bar"
            bgColor="gold"
            height="full"
            width="full"
            style={{
                scaleX,
                transformOrigin: '0%'
            }}
        />
    );
};

export default ScrollProgressBar;
