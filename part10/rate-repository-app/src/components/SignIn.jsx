import Text from "./core/Text";
import { useFormik } from "formik";
import { View, TextInput, Pressable, StyleSheet } from "react-native";

import theme from "../theme";

import * as yup from "yup";

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
  field_error: {
    borderColor: "red",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    color: "white",
  },
  error: {
    display: "flex",
    flexWrap: "wrap",
    color: theme.colors.error,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string("Username not a valid string.")
    .required("Username is required.")
    .min(3, "Username must be greater than 3."),
  password: yup
    .string("Password not a valid string.")
    .required("Password is required.")
    .min(8, "Username must be 8 or more characters."),
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
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.item,
          styles.field,
          formik.touched.username &&
            formik.errors.username &&
            styles.field_error,
        ]}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.item,
          styles.field,
          formik.touched.password &&
            formik.errors.password &&
            styles.field_error,
        ]}
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={[styles.item, styles.button]}
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
