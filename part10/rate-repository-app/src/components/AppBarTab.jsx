import { StyleSheet, Pressable } from "react-native";
import Text from "./core/Text";
import { Link } from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  heading: {
    color: theme.colors.appBarText,
    margin: 10,
  },
});

const AppBarTab = (props) => {
  return (
    <Pressable>
      <Link to={props.link} onPress={props.onPress}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.heading}>
          {props.children}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
