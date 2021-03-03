import PropTypes from 'prop-types';
import {
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger
} from '@chakra-ui/react';

const PopoverConfirm = ({ isOpen, trigger, title, body, placement, onClose, onConfirm }) => {
    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement={placement}
            closeOnBlur={false}>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent zIndex={4}>
                <PopoverHeader fontWeight="semibold">{title}</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{body}</PopoverBody>
                <PopoverFooter d="flex" justifyContent="flex-end">
                    <ButtonGroup size="sm">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm}>
                            Apply
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverConfirm;

PopoverConfirm.defaultProps = {
    title: 'Confirmation',
    body: 'Are you sure you want to continue with your action?',
    placement: 'left'
};

PopoverConfirm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    trigger: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
    placement: PropTypes.oneOf(['right', 'left', 'top', 'bottom'])
};
