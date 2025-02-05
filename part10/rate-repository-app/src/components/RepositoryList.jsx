import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

import RespositoryItem from "./RepositoryItem";

import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const repoOrderStates = [
  {
    label: "Latest repositories",
    value: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
  },
  {
    label: "Highest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
  },
  {
    label: "Lowest rated repositories",
    value: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  },
];

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  handleRepoClick,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepoClick(item.id)}>
          <RespositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Picker
          prompt="Select order of repositories."
          selectedValue={order}
          onValueChange={(itemValue) => setOrder(itemValue)}
        >
          {repoOrderStates.map((o, i) => (
            <Picker.Item key={i} label={o.label} value={i} />
          ))}
        </Picker>
      }
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(0);
  const { orderBy, orderDirection } = repoOrderStates[order].value;

  const { repositories } = useRepositories(orderBy, orderDirection);

  const handleRepoClick = (repoId) => {
    navigate(`/repo/${repoId}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      handleRepoClick={handleRepoClick}
    />
  );
};

export default RepositoryList;
