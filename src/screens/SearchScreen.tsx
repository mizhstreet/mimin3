import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import {
  LayoutProvider,
  DataProvider,
  RecyclerListView,
} from "recyclerlistview";
import { Dimensions, View, TextInput, StyleSheet } from "react-native";
import WordCard from "../components/WordCard";
import data from "../data/data";
import { IWord } from "../types/IWord";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e57373",
    flex: 1,
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
    marginVertical: 15,
  },
  input: {
    height: 40,
    fontSize: 20,
    flex: 1,
  },
  list: {
    flex: 1,
    paddingBottom: 30,
  },
});

interface IState {
  dataProvider: DataProvider;
}

export default class SearchScreen extends React.Component<any, IState> {
  state: IState = {
    dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
      data.map((word) => ({
        type: "normal",
        word,
      }))
    ),
  };

  handleTextChange = debounce((text: string) => {
    const newData = data.filter(
      (i) =>
        i.romaji!.toLowerCase().includes(text.toLowerCase()) ||
        i.hira.includes(text) ||
        i.kanji.includes(text) ||
        i.meaning.toLowerCase().includes(text.toLowerCase()) ||
        i.vn.toLowerCase().includes(text.toLowerCase())
    );

    if (newData.length > 0)
      this.setState({
        dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
          newData.map((word) => ({
            type: "normal",
            word,
          }))
        ),
      });
  }, 300);

  render() {
    const layoutProvider = new LayoutProvider(
      (i) => this.state.dataProvider.getDataForIndex(i).type,
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

    const rowRenderer = (_: any, { word }: { word: IWord }) => (
      <View>
        <WordCard {...word} />
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Tìm gì đó ..."
            style={styles.input}
            onChangeText={(text) => {
              this.handleTextChange(text);
            }}
          />
          <View>
            <MaterialIcons name="search" size={23} style={styles.icon} />
          </View>
        </View>
        <React.Fragment>
          <RecyclerListView
            style={{ flex: 1, backgroundColor: "#e57373" }}
            dataProvider={this.state.dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={rowRenderer}
          />
        </React.Fragment>
      </View>
    );
  }
}
