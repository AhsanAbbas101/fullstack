import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();

    const { loading, error, data, refetch } = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (data)
            setRepositories(data.repositories)

    }, [data]);

    return { repositories, loading, error, refetch: refetch };
};

export default useRepositories;