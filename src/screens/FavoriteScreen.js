import React from "react";
import { Dimensions, View, Text } from "react-native";
import { Subscribe } from "unstated";
import {
  LayoutProvider,
  DataProvider,
  RecyclerListView
} from "recyclerlistview";
import WordCard from "../components/WordCard";
import WordStateContainer from "../state-containers/WordStateContainer";

const { width } = Dimensions.get("window");

const FavoriteScreen = () => (
  <Subscribe to={[WordStateContainer]}>
    {container => {
      if (container.state.favoriteData.length === 0) {
        return (
          <View>
            <Text>no favorite data</Text>
          </View>
        );
      }

      const dataProvider = new DataProvider(
        (r1, r2) => r1 !== r2
      ).cloneWithRows(
        container.state.favoriteData.map(item => ({
          type: "normal",
          item
        }))
      );

      const layoutProvider = new LayoutProvider(
        i => dataProvider
            .cloneWithRows(
              container.state.favoriteData.map(item => ({
                type: "normal",
                item
              }))
            )
            .getDataForIndex(i).type,
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

      const rowRenderer = (_, data) => (
        <View>
          <WordCard cardData={data.item} index={data.item.id} />
        </View>
      );

      return (
        <React.Fragment>
          <RecyclerListView
            style={{ flex: 1, backgroundColor: "#e57373" }}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={rowRenderer}
          />
        </React.Fragment>
      );
    }}
  </Subscribe>
);
export default FavoriteScreen;
