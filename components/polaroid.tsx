import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';

interface IPolaroidProps {
    children: React.ReactNode;
    title: string;
    unstyled?: boolean;
}

const Polaroid: React.FC<IPolaroidProps> = ({ children, title, unstyled = false }) => {
    const polaroidStyle: BoxProps = {
        padding: {
            base: '2rem',
            md: '1.5rem'
        },
        backgroundColor: 'white',
        boxShadow: '0 0.2rem 1.2rem rgba(0,0,0,0.2)',
        transform: {
            base: 'rotate(-1deg) scale(95%) translateY(0px)',
            md: 'rotate(-2deg) scale(90%) translateY(-15%)'
        }
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
