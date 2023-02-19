// import { CircularProgress, HStack, Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useIntl } from 'react-intl';
import LoginForm from './LoginForm';
import NoContentBanner from './NoContentBanner';
// import { sendToast } from '../utils/uiToast';

type Props = { children: React.ReactElement };

const AuthGard: React.FC<Props> = ({ children }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values?: any) => formatMessage({ id }, values);
    // const { data: session } = useSession();
    const { status } = useSession({
        required: false
        // onUnauthenticated() {
        // The user is not authenticated, handle it here.
        // sendToast(f('accessDenied'), f('pageRequiresAuthentication'), 'error', 3000, 'top');
        // }
    });

    if (status === 'authenticated') return children;

    return (
        <>
            <NoContentBanner
                text={f('authenticationRequired')}
                helperText={f('onceLoggedInFeatures')}
                // links={[
                //     {
                //         href: '/help',
                //         text: f('goToPageName', { name: f('menuEntryHelp') })
                //     }
                // ]}
            >
                {/* <HStack>
                    <CircularProgress as="span" size="1em" isIndeterminate color="orange.500" />
                    <Text as="span" fontSize="sm">
                        {f('redirectingYouToPageName', { name: f('menuEntryLogin') })}
                    </Text>
                </HStack> */}
                <Box fontFamily="body" fontSize="md">
                    <LoginForm />
                </Box>
            </NoContentBanner>
        </>
    );
};

export default AuthGard;
