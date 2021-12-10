import PropType from 'prop-types';
import {
    useColorMode,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay
} from '@chakra-ui/react';
import { headerBgColor, headerBgGradient } from './Header';

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
