import {
    Box,
    BoxProps,
    Text,
    TextProps,
    useColorModeValue,
    BackgroundProps
} from '@chakra-ui/react';

interface IPolaroidProps {
    children: React.ReactNode;
    title: string;
    unstyled?: boolean;
}

const Polaroid: React.FC<IPolaroidProps> = ({ children, title, unstyled = false }) => {
    const bgColor: BackgroundProps['backgroundColor'] = useColorModeValue('white', 'gray.700');
    const textColor: TextProps['color'] = useColorModeValue('black', 'white');
    const borderColor: BoxProps['border'] = '0.5px solid rgba(126,126,126,0.5)';

    const polaroidStyle: BoxProps = {
        padding: {
            base: '2rem',
            md: '1.5rem'
        },
        backgroundColor: bgColor,
        boxShadow: '0 0.2rem 1.2rem rgba(0,0,0,0.2)',
        transform: {
            base: 'rotate(-1deg) scale(95%) translateY(0px)',
            lg: 'rotate(-1deg) scale(90%) translateY(-15%)'
        },
        transition: 'all .25s ease',
        color: textColor,
        border: borderColor,
        rounded: 'lg'
    };

    const textStyle: TextProps = {
        fontFamily: 'cursive',
        fontSize: {
            base: '2xl',
            sm: '3xl',
            md: '4xl'
        },
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: '1rem',
        textAlign: 'center'
    };

    return (
        <>
            <Box {...(unstyled ? {} : polaroidStyle)}>
                <Box>{children}</Box>
                <Text {...textStyle}>{title}</Text>
            </Box>
        </>
    );
};

export default Polaroid;
