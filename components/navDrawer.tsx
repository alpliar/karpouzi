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
import { headerBgGradient } from './Header';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    body: React.ReactNode;
    footer?: React.ReactNode;
}

const NavDrawer: React.FC<IProps> = ({ isOpen, onClose, body, footer }) => {
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
