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

  const variables = {
    repositoryId: repoId,
    first: 8,
  };

  const { loading, error, data, fetchMore } = useQuery(GET_SINGLE_REPO, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

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
        <Text>Loading Repository: {repoId}</Text>
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
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryView;
