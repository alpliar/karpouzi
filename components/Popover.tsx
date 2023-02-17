import {
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
    body: React.ReactElement;
    footer?: React.ReactElement;
    header?: React.ReactElement;
};

const Popover: React.FC<Props> = ({ children, body, footer, header }) => {
    return (
        <ChakraPopover trigger="hover">
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent w="auto" minW={40}>
                <PopoverArrow />
                {header && (
                    <PopoverHeader>
                        {header}
                        {/* <HStack>
                        <PopoverCloseButton position="initial" />
                    </HStack> */}
                    </PopoverHeader>
                )}
                <PopoverBody>
                    <Stack gap={0} align="center">
                        {body}
                    </Stack>
                </PopoverBody>
                {footer && (
                    <Flex as={PopoverFooter} justify="flex-end">
                        {footer}
                    </Flex>
                )}
            </PopoverContent>
        </ChakraPopover>
    );
};

export default Popover;
