
import { useQuery, useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

import { ME } from '../graphql/queries'
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
    const authStore = useAuthStorage()
    const apolloClient = useApolloClient()

    const [user, setUser] = useState(null);
    const result = useQuery(ME);

    useEffect(() => {
        if (result.data)
            setUser(result.data.me);
    }, [result.data])

    const signOut = async () => {
        await authStore.removeAccessToken();
        await apolloClient.resetStore();
    }

    return [user, signOut]
}

export default useCurrentUser