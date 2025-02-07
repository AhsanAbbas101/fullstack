import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOS } from '../graphql/queries';

const useRepositories = (variables) => {

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOS, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };


    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        ...result,
    };
};

export default useRepositories;