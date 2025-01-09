import { View, StyleSheet, ScrollView } from "react-native";

import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    display: "flex",
    flexDirection: "row",
    //flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/">Repositories</AppBarTab>
        <AppBarTab link="/login">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
