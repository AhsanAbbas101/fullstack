import { View, StyleSheet, Image, Button, Linking } from "react-native";
import Text from "./core/Text";
import RepoItemStat from "./RepoItemStat";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "grid",
    gridTemplateRows: "2fr 1fr",
  },

  row_item_1: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    paddingTop: 10,
  },

  row_item_2: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    placeItems: "center",
  },
  row_item_3: {
    display: "grid",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language_span: {
    color: "white",
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 2,
  },
});

const RespositoryItem = ({ item, isExpanded = false }) => {
  if (!item) return null;

  const handleOnClick = () => {
    console.log("pressed " + item.url);
    Linking.openURL(item.url);
  };

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row_item_1}>
        <View style={{ justifySelf: "center" }}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flexWrap: "wrap",
            padding: 4,
          }}
        >
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text>
            <span style={styles.language_span}>{item.language}</span>
          </Text>
        </View>
      </View>
      <View style={styles.row_item_2}>
        <RepoItemStat stat="Stars" value={item.stargazersCount} />
        <RepoItemStat stat="Forks" value={item.forksCount} />
        <RepoItemStat stat="Reviews" value={item.reviewCount} />
        <RepoItemStat stat="Rating" value={item.ratingAverage} />
      </View>
      {isExpanded && (
        <View style={styles.row_item_3}>
          <Button title="Open in Github" onPress={handleOnClick} />
        </View>
      )}
    </View>
  );
};

export default RespositoryItem;
