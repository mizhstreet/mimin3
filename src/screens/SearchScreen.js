import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  LayoutProvider,
  DataProvider,
  RecyclerListView
} from "recyclerlistview";
import {
 Dimensions, View, TextInput, StyleSheet 
} from "react-native";
import WordCard from "../components/WordCard";
import data from "../data/data";

const { width } = Dimensions.get("window");

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
  constructor() {
    super();
    this.state = {
      dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        data.map(item => ({
          type: "normal",
          item
        }))
      )
    };
    this.handleTextChange = text => {
      this.setState({
        dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
          data
            .filter(i => i.romaji.toLowerCase().includes(text.toLowerCase()))
            .map(item => ({
              type: "normal",
              item
            }))
        )
      });
    };
    this.layoutProvider = new LayoutProvider(
      i => this.state.dataProvider.getDataForIndex(i).type,
      (type, dim) => {
        switch (type) {
          case "normal":
            dim.width = width;
            dim.height = 150;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      }
    );
  }

  render() {
    const rowRenderer = (_, rowData) => (
      <View>
        <WordCard cardData={rowData.item} index={rowData.item.id} />
      </View>
    );
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
          <View>
            <MaterialIcons name="search" size={23} />
          </View>
        </View>
        <React.Fragment>
          <RecyclerListView
            style={{ flex: 1, backgroundColor: "#e57373" }}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            rowRenderer={rowRenderer}
          />
        </React.Fragment>
      </View>
    );
  }
}
