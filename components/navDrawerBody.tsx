import { Stack } from '@chakra-ui/layout';
import { useIntl } from 'react-intl';
import NavDrawerBodyItem from './navDrawerBodyItem';

const NavDrawerBody = () => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    return (
        <Stack spacing="2">
            <NavDrawerBodyItem
                href="/blog"
                alt={f('goToPageName', { name: f('menuEntryBlog') })}
                text={f('menuEntryBlog')}
            />
            <NavDrawerBodyItem
                href="/shop"
                alt={f('goToPageName', { name: f('menuEntryShop') })}
                text={f('menuEntryShop')}
            />
        </Stack>
    );
};

export default NavDrawerBody;

NavDrawerBody.propTypes = {};
