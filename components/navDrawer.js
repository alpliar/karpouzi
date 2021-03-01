import PropType from 'prop-types';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from '@chakra-ui/react';

const NavDrawer = ({ isOpen, onClose, body, footer }) => {
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay>
                <DrawerContent color="white" bg="teal.600">
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>{body}</DrawerBody>

                    {footer && <DrawerFooter>{footer}</DrawerFooter>}
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default NavDrawer;

NavDrawer.propTypes = {
    isOpen: PropType.bool.isRequired,
    onClose: PropType.func.isRequired,
    body: PropType.node.isRequired,
    footer: PropType.node
};
