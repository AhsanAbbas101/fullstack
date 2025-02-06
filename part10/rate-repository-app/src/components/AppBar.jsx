import { View, StyleSheet, ScrollView } from "react-native";

import Constants from "expo-constants";

import theme from "../theme";
import AppBarTab from "./AppBarTab";
import useCurrentUser from "../hooks/useCurrentUser";

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
  const [user, signOut] = useCurrentUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link="/">Repositories</AppBarTab>
        {!user ? (
          <>
            <AppBarTab link="/login">Sign In</AppBarTab>
            <AppBarTab link="/signup">Sign Up</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab link="/review/new">Create a review</AppBarTab>
            <AppBarTab link="/review">My Reviews</AppBarTab>
            <AppBarTab link="/" onPress={signOut}>
              Sign Out
            </AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
