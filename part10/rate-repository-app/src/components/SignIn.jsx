import Text from "./core/Text";
import { useFormik } from "formik";
import { View, TextInput, Pressable, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 4,
  },
  item: {
    height: 45,
    margin: 10,
    borderRadius: 5,
  },
  field: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: theme.fontSizes.body,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.item, ...styles.field }}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={{ ...styles.item, ...styles.field }}
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={{ ...styles.item, ...styles.button }}
          fontSize="subheading"
          fontWeight="bold"
        >
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
