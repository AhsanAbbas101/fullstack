import { useParams } from "react-router-native";
import RespositoryItem from "./RepositoryItem";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

import { View } from "react-native";
import Text from "./core/Text";

const RepositoryView = () => {
  // get repo item using id
  let { repoId } = useParams();

  const { loading, error, data } = useQuery(GET_SINGLE_REPO, {
    variables: {
      repositoryId: repoId,
    },
  });

  if (!repoId) {
    return (
      <View>
        <Text>Invalid Repository: {repoId}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Fetching Repository: {repoId}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Failed to Fetch Repository: {repoId}</Text>
      </View>
    );
  }

  return <RespositoryItem item={data.repository} isExpanded />;
};

export default RepositoryView;
