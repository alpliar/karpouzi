export const createToast = (
    title,
    description,
    status = 'info',
    duration = 1500,
    position = 'bottom-right',
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
