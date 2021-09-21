import { VStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import NavDrawerBodyItem from './navDrawerBodyItem';

const NavDrawerBody = () => {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <VStack spacing="2">
            <NavDrawerBodyItem href="/blog" alt="go to blog page" text={f('menuEntryBlog')} />
            <NavDrawerBodyItem href="/shop" alt="go to shop page" text={f('menuEntryShop')} />
        </VStack>
    );
};

export default NavDrawerBody;

NavDrawerBody.propTypes = {};
