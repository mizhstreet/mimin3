import React from "react";
import { Dimensions, View } from "react-native";
import { Subscribe } from "unstated";
import {
  RecyclerListView,
  LayoutProvider,
  DataProvider
} from "recyclerlistview";
import Spinner from "react-native-loading-spinner-overlay";
import WordCard from "../components/WordCard";
import WordStateContainer from "../state-containers/WordStateContainer";
import data from "../data/data";

const { width } = Dimensions.get("window");

const UnitScreen = (indexStart, indexEnd) => class extends React.Component {
    constructor() {
      super();
      this.state = {
        dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
          data.slice(indexStart, indexEnd).map(item => ({
            type: "normal",
            item
          }))
        )
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
        <Subscribe to={[WordStateContainer]}>
          {container => {
            if (container.state.favoriteDataLoaded) {
              return (
                <RecyclerListView
                  style={{ flex: 1, backgroundColor: "#e57373" }}
                  dataProvider={this.state.dataProvider}
                  layoutProvider={this.layoutProvider}
                  rowRenderer={rowRenderer}
                />
              );
            }
            container.getFavoriteData();
            return <Spinner visible />;
          }}
        </Subscribe>
      );
    }
  };
export default UnitScreen;
