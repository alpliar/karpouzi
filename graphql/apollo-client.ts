import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client';

const options: ApolloClientOptions<unknown> = {
    uri: process.env.GRAPHCMS_API,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
};

const apolloClient = new ApolloClient({ ...options });

export default apolloClient;
