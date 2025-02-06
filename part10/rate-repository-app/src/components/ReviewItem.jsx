import { View, StyleSheet, Button, Pressable } from "react-native";
import Text from "./core/Text";

import { format } from "date-fns";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  review: {
    paddingTop: 5,
  },

  rating_div: {
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "center",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "rgb(33 150 243)",
  },
  rating: {
    color: "rgb(33 150 243)",
  },
  container_action: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexBasis: "auto",
    marginBottom: 10,
    padding: 10,
  },
  button_action: {
    height: 50,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(33 150 243)",
    borderRadius: 5,
  },
  button_action_text: {
    color: theme.colors.appBarText,
  },
});

const formatDate = (s) => {
  return format(new Date(s), "dd.MM.yyyy");
};

const ReviewItem = ({
  review,
  currentUser = false,
  handleView,
  handleDelete,
}) => {
  if (!review) return null;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rating_div}>
          <Text fontWeight="bold" style={styles.rating}>
            {review.rating}
          </Text>
        </View>
        <View>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
          <Text style={styles.review}>{review.text}</Text>
        </View>
      </View>

      {currentUser && (
        <View style={styles.container_action}>
          <Pressable
            onPress={() => handleView(review.repositoryId)}
            style={styles.button_action}
          >
            <Text style={styles.button_action_text}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDelete(review.id)}
            style={[
              styles.button_action,
              { backgroundColor: "rgb(214 57 76)" },
            ]}
          >
            <Text style={styles.button_action_text}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ReviewItem;
