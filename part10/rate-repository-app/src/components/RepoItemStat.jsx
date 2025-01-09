import { View, StyleSheet } from "react-native";
import Text from "./core/Text";

const styles = StyleSheet.create({
  stats: {
    gap: 3,
  },
});

const RepoItemStat = ({ stat, value }) => {
  return (
    <View style={styles.stats}>
      <Text fontWeight="bold" style={{ textAlign: "center" }}>
        {value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      </Text>
      <Text color="textSecondary" style={{ textAlign: "center" }}>
        {stat}
      </Text>
    </View>
  );
};

export default RepoItemStat;
