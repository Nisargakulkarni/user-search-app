import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";


export default function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredData = data.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>User ID: <Text style={styles.itemValue}>{item.id}</Text></Text>
      <Text style={styles.itemTitle}>First Name: <Text style={styles.itemValue}>{item.first_name}</Text></Text>
      <Text style={styles.itemTitle}>Last Name: <Text style={styles.itemValue}>{item.last_name}</Text></Text>
      <Text style={styles.itemTitle}>Email: <Text style={styles.itemValue}>{item.email}</Text></Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Greendzine</Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Search by First Name"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholderTextColor="#999"
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F5",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 20,
    textAlign: "center",
    color: "#2E3A59",
  },
  searchBox: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#3D8BFF",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 4,
  },
  itemValue: {
    fontWeight: "400",
    color: "#5D6D7E",
  },
});
