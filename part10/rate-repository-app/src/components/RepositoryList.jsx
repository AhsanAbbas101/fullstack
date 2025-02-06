import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import RespositoryItem from "./RepositoryItem";

import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  header: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  search: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  picker: {
    justifyContent: "center",
    height: 50,
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

const RepositoryListHeader = ({
  order,
  setOrder,
  searchText,
  setSearchText,
}) => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={searchText}
        onChangeText={(value) => setSearchText(value)}
      />
      <Picker
        style={styles.picker}
        prompt="Select order of repositories."
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
      >
        {repoOrderStates.map((o, i) => (
          <Picker.Item key={i} label={o.label} value={i} />
        ))}
      </Picker>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { order, setOrder, searchText, setSearchText } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    );
  };

  render() {
    const { repositories, handleRepoClick } = this.props;

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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(0);
  const { orderBy, orderDirection } = repoOrderStates[order].value;
  const [searchText, setSearchText] = useState("");
  const [searchKeyword] = useDebounce(searchText, 1000);
  const { repositories } = useRepositories(
    searchKeyword,
    orderBy,
    orderDirection
  );

  const handleRepoClick = (repoId) => {
    navigate(`/repo/${repoId}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchText={searchText}
      setSearchText={setSearchText}
      handleRepoClick={handleRepoClick}
    />
  );
};

export default RepositoryList;
