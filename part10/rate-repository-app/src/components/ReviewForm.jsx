import Text from "./core/Text";
import { useFormik } from "formik";
import { View, TextInput, Pressable, StyleSheet } from "react-native";

import theme from "../theme";

import * as yup from "yup";

import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useState } from "react";

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
  field_multiline: {
    height: 100,
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
  ownerName: yup
    .string("Owner name not a valid string.")
    .required("Owner name is required.")
    .min(3, "Owner name must be greater than 3."),
  repositoryName: yup
    .string("Repository name not a valid string.")
    .required("Repository name is required.")
    .min(3, "Repository name must be greater than 3."),
  rating: yup
    .number()
    .required("Rating is required.")
    .integer("Rating must be a whole number.")
    .min(0, "Rating must be a positive.")
    .max(100, "Rating must be with 0 and 100.")
    .typeError("Rating must be a number"),
  text: yup.string("Review not a valid string."),
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

export const ReviewFormContainer = ({ onSubmit, error }) => {
  const handleSubmit = async (values) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.item,
          styles.field,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.field_error,
        ]}
        placeholder="Repository owner name"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          styles.item,
          styles.field,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.field_error,
        ]}
        placeholder="Repository name"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        inputMode="numeric"
        style={[
          styles.item,
          styles.field,
          formik.touched.rating && formik.errors.rating && styles.field_error,
        ]}
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}

      <TextInput
        multiline
        style={[
          styles.item,
          styles.field,
          styles.field_multiline,
          formik.touched.text && formik.errors.text && styles.field_error,
        ]}
        placeholder="Write a review"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={[styles.item, styles.button]}
          fontSize="subheading"
          fontWeight="bold"
        >
          Create a review
        </Text>
      </Pressable>
      {error !== "" && (
        <Text fontWeight="bold" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const [create] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => {
      setApiError("");
      navigate(`/repo/${data.createReview.repositoryId}`);
    },
    onError: (error) => {
      setApiError(error.message);
    },
  });

  const onSubmit = async (values) => {
    const review = { ...values, rating: Number(values.rating) };
    create({ variables: { review } });
  };

  return <ReviewFormContainer onSubmit={onSubmit} error={apiError} />;
};

export default ReviewForm;
