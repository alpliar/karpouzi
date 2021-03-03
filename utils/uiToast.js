export const createToast = (
    title,
    description,
    status = 'info',
    position = 'bottom-right',
    duration = 1500,
    isClosable = true
) => {
    return {
        title: title,
        description: description,
        status: status,
        position: position,
        duration: duration,
        isClosable: isClosable
    };
};
