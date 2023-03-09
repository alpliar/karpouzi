import { Box, BoxProps, Flex, Stack, ThemingProps } from '@chakra-ui/react';
import React from 'react';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import Section from './layout/Section';

type Props = {
    children: React.ReactNode;
    aside: React.ReactNode;
    colorScheme: ThemingProps['colorScheme'];
    id?: string;
    rest?: BoxProps;
};

const SectionHighlight: React.FC<Props> = ({
    aside,
    children,
    colorScheme = 'green',
    id,
    ...rest
}) => {
    const mainContentWidth = '60%';
    const asideWidth = `calc(100% - ${mainContentWidth})`;

    return (
        <Section
            id={id}
            colorScheme={colorScheme}
            useSecondaryColor
            fullWidth
            paddingY={{ base: 8, sm: 0 }}
            minHeight={{ sm: '3xl' }}
            component={
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap={4}
                    position="relative"
                    // height="full"
                    minH={{ sm: '3xl' }}>
                    <Box
                        width="full"
                        paddingX={{ base: 2, sm: 4 }}
                        paddingY={{ base: 8, md: 16, xl: 24 }}
                        maxWidth={APP_MAX_WIDTH}
                        margin="auto">
                        <Stack
                            maxHeight={{ sm: '2xl' }}
                            overflow="auto"
                            spacing={4}
                            width={{ base: 'full', sm: mainContentWidth }}
                            paddingRight={{ sm: 8, md: undefined }}>
                            {children}
                        </Stack>
                    </Box>
                    <Box
                        marginTop={{ sm: '-.6em', md: undefined }} // fills blank space above section
                        width={{ base: 'full', sm: asideWidth }}
                        marginStart={{ sm: mainContentWidth }}
                        backgroundColor={`${colorScheme}.400`}
                        _dark={{
                            backgroundColor: `${colorScheme}.700`
                        }}
                        // bgImage={getPattern('curtain', 'white', 0.5)}
                        position={{ sm: 'absolute' }}
                        inset={{ sm: 0 }}
                        transform={{ sm: 'skewY(-1deg)' }}>
                        {aside}
                    </Box>
                </Flex>
            }
            {...rest}
        />
    );
};

export default SectionHighlight;
