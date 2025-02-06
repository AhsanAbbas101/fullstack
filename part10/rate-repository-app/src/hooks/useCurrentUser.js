
import { useQuery, useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

import { ME } from '../graphql/queries'
import { useEffect, useState } from 'react';

const useCurrentUser = (includeReviews = false) => {
    const authStore = useAuthStorage()
    const apolloClient = useApolloClient()

    const [user, setUser] = useState(null);
    const { data, refetch } = useQuery(ME, {
        variables: {
            includeReviews
        },
        nextFetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if (data)
            setUser(data.me);
    }, [data])

    const signOut = async () => {
        await authStore.removeAccessToken();
        await apolloClient.resetStore();
    }

    return [user, signOut, refetch]
}

export default useCurrentUser