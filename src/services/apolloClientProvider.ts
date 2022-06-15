import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from '../utils/constants'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
        ...headers,
        authorization: `Bearer ${token}`
        }
    }
})

const httpLink = new HttpLink({
    uri: "/graphql"
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default apolloClient