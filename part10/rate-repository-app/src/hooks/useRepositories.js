import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
    const [repositories, setRepositories] = useState();

    const { loading, error, data, refetch } = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderBy,
            orderDirection
        }
    });

    useEffect(() => {
        if (data)
            setRepositories(data.repositories)

    }, [data]);

    return { repositories, loading, error, refetch: refetch };
};

export default useRepositories;