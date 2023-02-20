import {
    Box,
    Flex,
    Popover as ChakraPopover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Stack
} from '@chakra-ui/react';
import React from 'react';
type Props = {
    children: React.ReactElement;
    trigger: React.ReactElement;
    footer?: React.ReactElement;
    header?: React.ReactElement;
};

const Popover: React.FC<Props> = ({ children, trigger, footer, header }) => {
    return (
        <Box>
            <ChakraPopover trigger="hover">
                <PopoverTrigger>{trigger}</PopoverTrigger>
                <PopoverContent w="auto" minW={40}>
                    <PopoverArrow />
                    {header && (
                        <PopoverHeader display="flex" alignItems="center" justifyContent="center">
                            {header}
                            {/* <HStack>
                        <PopoverCloseButton position="initial" />
                    </HStack> */}
                        </PopoverHeader>
                    )}
                    <PopoverBody>
                        <Stack gap={0} align="center">
                            {children}
                        </Stack>
                    </PopoverBody>
                    {footer && (
                        <Flex as={PopoverFooter} justify="flex-end">
                            {footer}
                        </Flex>
                    )}
                </PopoverContent>
            </ChakraPopover>
        </Box>
    );
};

export default Popover;
