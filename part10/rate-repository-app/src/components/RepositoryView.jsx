import { useParams } from "react-router-native";
import RespositoryItem from "./RepositoryItem";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

import { FlatList, View, StyleSheet } from "react-native";
import Text from "./core/Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 15,
    backgroundColor: "#e1e5e8",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

  //return <RespositoryItem item={data.repository} isExpanded />;
  console.log(data);
  const repository = data.repository;
  const reviews = repository.reviews.edges.map((e) => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RespositoryItem item={repository} isExpanded />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;
