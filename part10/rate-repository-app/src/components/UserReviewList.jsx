import { FlatList, StyleSheet, View } from "react-native";
import useCurrentUser from "../hooks/useCurrentUser";
import Text from "./core/Text";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 15,
    backgroundColor: "#e1e5e8",
  },
  header: {
    display: "flex",
    height: 20,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    padding: 5,
  },
  header_text: {
    fontSize: 20,
    color: "#2196f3",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const HeaderComponent = ({ len }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>{len} Reviews.</Text>
    </View>
  );
};

const UserReviewList = () => {
  const [user, _, refetch] = useCurrentUser(true);
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (!user) return null;

  const reviews = user.reviews.edges.map((e) => e.node);

  const handleDelete = async (reviewId) => {
    await deleteReview({
      variables: {
        deleteReviewId: reviewId,
      },
    });
    refetch();
  };
  const handleView = (repoId) => {
    navigate(`/repo/${repoId}`);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          currentUser
          review={item}
          handleDelete={handleDelete}
          handleView={handleView}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<HeaderComponent len={reviews.length} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviewList;
