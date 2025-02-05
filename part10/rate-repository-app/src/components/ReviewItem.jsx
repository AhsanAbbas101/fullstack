import { View, StyleSheet } from "react-native";
import Text from "./core/Text";

import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    padding: 5,
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
});

const formatDate = (s) => {
  return format(new Date(s), "dd.MM.yyyy");
};

const ReviewItem = ({ review }) => {
  if (!review) return null;

  return (
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
  );
};

export default ReviewItem;
