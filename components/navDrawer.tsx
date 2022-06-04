import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useColorMode
} from '@chakra-ui/react';
import PropType from 'prop-types';
import { headerBgGradient } from './Header';

const NavDrawer = ({ isOpen, onClose, body, footer }) => {
    const { colorMode } = useColorMode();
    const bgGradient = headerBgGradient(colorMode);
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay>
                <DrawerContent
                    // bg={headerBgColor(colorMode)}
                    bgGradient={bgGradient}>
                    <DrawerCloseButton fontSize="md" width={10} height={10} />
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
