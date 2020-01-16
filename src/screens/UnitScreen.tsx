import * as React from "react";
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
import { IWord } from "../types/IWord";

const { width, height } = Dimensions.get("window");

interface IState {
  dataProvider: DataProvider;
}
const UnitScreen = (indexStart: number, indexEnd: number) =>
  class extends React.Component<any, IState> {
    state = {
      dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        data.slice(indexStart, indexEnd).map(word => ({
          type: "normal",
          word
        }))
      )
    };

    render() {
      const layoutProvider = new LayoutProvider(
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

      const rowRenderer = (_: any, { word }: { word: IWord }) => {
        return (
          <View>
            <WordCard {...word} />
          </View>
        );
      };

      return (
        <Subscribe to={[WordStateContainer]}>
          {(container: WordStateContainer) => {
            if (container.state.isFavoriteLoaded) {
              return (
                <View
                  style={{
                    width: "100%",
                    height
                  }}
                >
                  <RecyclerListView
                    style={{ flex: 1, backgroundColor: "#e57373" }}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={layoutProvider}
                    rowRenderer={rowRenderer}
                  />
                </View>
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
