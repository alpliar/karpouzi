import {
    Button,
    ButtonGroup,
    PlacementWithLogical,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IProps {
    isOpen: boolean;
    trigger: ReactNode;
    title?: ReactNode;
    body: ReactNode;
    placement?: PlacementWithLogical;
    onClose: any;
    onConfirm: any;
}

const PopoverConfirm: React.FC<IProps> = ({
    isOpen,
    trigger,
    title = 'Confirmation',
    body,
    placement,
    onClose,
    onConfirm
}) => {
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
