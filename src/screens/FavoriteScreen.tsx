import * as React from "react";
import { Dimensions, View, Text, Image } from "react-native";
import { Subscribe } from "unstated";
import {
  LayoutProvider,
  DataProvider,
  RecyclerListView
} from "recyclerlistview";
import image from "../assets/images/nothing.png";
import WordCard from "../components/WordCard";
import WordStateContainer from "../state-containers/WordStateContainer";
import { IWord } from "../types/IWord";

const { width } = Dimensions.get("window");

const FavoriteScreen = () => (
  <Subscribe to={[WordStateContainer]}>
    {(container: WordStateContainer) => {
      if (container.state.favoriteWords.length === 0) {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={image}
                style={{ resizeMode: "cover", height: 300, width: 200 }}
              />
              <Text style={{ fontSize: 20, color: "grey" }}>
                Chưa có từ vựng yêu thích nào!
              </Text>
            </View>
          </View>
        );
      }

      const dataProvider = new DataProvider(
        (r1, r2) => r1 !== r2
      ).cloneWithRows(
        container.state.favoriteWords.map(word => ({
          type: "normal",
          word
        }))
      );

      const layoutProvider = new LayoutProvider(
        i =>
          dataProvider
            .cloneWithRows(
              container.state.favoriteWords.map(word => ({
                type: "normal",
                word
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

      const rowRenderer = (_: any, { word }: { word: IWord }) => (
        <View>
          <WordCard {...word} />
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
