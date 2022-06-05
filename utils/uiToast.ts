import { createStandaloneToast, ToastPosition, UseToastOptions } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ToastStatus = UseToastOptions['status'];

const defaultStatus: ToastStatus = 'info';
const defaultPosition: ToastPosition = 'bottom-right';

export const sendToast = (
    title: ReactNode,
    description: ReactNode,
    status: ToastStatus = defaultStatus,
    duration = 1500,
    position: ToastPosition = defaultPosition,
    isClosable = true
) => {
    const toast = createStandaloneToast().toast;

    toast({
        title: title,
        description: description,
        status: status,
        position: position,
        duration: duration,
        isClosable: isClosable
    });
};
