import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TouchableNativeFeedback,
  View,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";
import WordCard from "../components/WordCard";
import data from "../data/Unit1";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e57373",
    flex: 1
  },
  searchBar: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#e57373",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 15
  },
  input: {
    height: 40,
    fontSize: 20
  },
  list: {
    flex: 1,
    paddingBottom: 30
  }
});

export default class SearchScreen extends React.Component {
  state = {
    data: []
  };

  handleTextChange = text => {
    this.setState({
      data: data.filter(arr => arr.romaji.toLowerCase().includes(text.toLowerCase()))
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Tìm gì đó ..."
            style={styles.input}
            onChangeText={text => {
              this.handleTextChange(text);
            }}
          />
          <TouchableNativeFeedback
            onPress={() => alert("Save success")}
            background={TouchableNativeFeedback.SelectableBackground()}
          >
            <View>
              <MaterialIcons name="search" size={23} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={({ item }) => (
            <WordCard cardData={item} index={item.id} />
          )}
          keyExtractor={(_, index) => index.toString()}
          overScrollMode="always"
        />
      </View>
    );
  }
}
