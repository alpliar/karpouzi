import { BoxProps, Stack, ThemingProps } from '@chakra-ui/react';
import { Box, Button, Text } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react';

interface Props extends BoxProps {
    children: React.ReactNode;
    noOfLines: number;
    labelMore: string;
    labelLess: string;
    colorScheme?: ThemingProps['colorScheme'];
    onToggle?: (isExpanded: boolean) => void;
}

export const ExpandableText = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            noOfLines,
            labelMore = 'See more',
            labelLess = 'See less',
            colorScheme,
            onToggle,
            ...rest
        },
        ref
    ) => {
        const [expandedCount, setExpandedCount] = useState<number | undefined>(noOfLines);
        const [isClicked, setIsClicked] = useState(false);
        const handleToggle = () => {
            setIsClicked(true);
            setExpandedCount(expandedCount ? undefined : noOfLines);
            onToggle && onToggle(expandedCount ? true : false);
        };

        const inputRef = React.useRef<HTMLInputElement>(null);

        const isTextClamped =
            (inputRef.current?.scrollHeight as number) >
                (inputRef.current?.clientHeight as number) || isClicked;

        return (
            <Stack ref={ref} {...rest}>
                <Box ref={inputRef} noOfLines={expandedCount}>
                    {children}
                </Box>
                <Box>
                    <Button
                        w={{ base: 'full', sm: 'auto' }}
                        display={isTextClamped ? 'block' : 'none'}
                        onClick={handleToggle}
                        colorScheme={colorScheme}>
                        <Text>{!expandedCount ? labelLess : labelMore}</Text>
                    </Button>
                </Box>
            </Stack>
        );
    }
);

ExpandableText.displayName = 'ExpandableText';
