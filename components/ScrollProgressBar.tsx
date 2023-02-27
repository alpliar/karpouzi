import { chakra, ThemingProps } from '@chakra-ui/react';
import { isValidMotionProp, motion, useScroll, useSpring } from 'framer-motion';
import React from 'react';

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp
});

interface ScrollProgressBarProps {
    colorScheme?: ThemingProps['colorScheme'];
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ colorScheme }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const defaultColor = 'gold';
    const lightModeColor = colorScheme && `${colorScheme}.400`;
    const darkModeColor = `${colorScheme}.600`;

    return (
        <ChakraBox
            className="progress-bar"
            bgColor={lightModeColor || defaultColor}
            _dark={{
                bgColor: darkModeColor || defaultColor
            }}
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
