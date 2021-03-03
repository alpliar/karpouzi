import { createStandaloneToast } from '@chakra-ui/react';

export const sendToast = (
    title,
    description,
    status = 'info',
    duration = 1500,
    position = 'bottom-right',
    isClosable = true
) => {
    const toast = createStandaloneToast();
    toast({
        title: title,
        description: description,
        status: status,
        position: position,
        duration: duration,
        isClosable: isClosable
    });
};
