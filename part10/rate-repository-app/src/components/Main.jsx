import { Text, StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";
import UserReviewList from "./UserReviewList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/repo/:repoId" element={<RepositoryView />} />
        <Route path="/review/new" element={<ReviewForm />} />
        <Route path="/review" element={<UserReviewList />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
