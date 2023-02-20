import { ApolloError } from '@apollo/client';

const errorHandler = (anyError: unknown): Error => {
    if (typeof anyError === 'string') return new Error(anyError);
    if (anyError instanceof ApolloError) {
        if (
            anyError.networkError &&
            'result' in anyError.networkError &&
            'errors' in anyError.networkError.result &&
            anyError.networkError.result.errors.length
        ) {
            return new Error(anyError.networkError.result.errors[0].message);
            // if (networkError.extensions.code === 'BAD_USER_INPUT') {
            //     return new Error(networkError.message.split(';').slice(-1)[0].trim());
            // } else {
            //     return new Error(networkError.message);
            // }
        }

        //   if (anyError.graphQLErrors && anyError.graphQLErrors.length) {
        //     return new Error('Error - ', anyError.graphQLErrors[0].message);
        //     anyError.message = anyError.graphQLErrors[0].message;
        //   }
        // console.log({ ...anyError.networkError.result.errors });
        return new Error('Apollo Error');
    }
    if (anyError instanceof Error) return anyError;
    return Error('Unknown error has occured');
};

export default errorHandler;
