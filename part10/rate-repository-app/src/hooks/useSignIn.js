import { useApolloClient, useMutation } from "@apollo/client"
import { AUTH } from '../graphql/mutations'

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(AUTH);

    const signIn = async ({ username, password }) => {

        const { data } = await mutate({
            variables: {
                credentials: {
                    username, password
                }
            }
        });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
    }

    return [signIn, result];
}

export default useSignIn
