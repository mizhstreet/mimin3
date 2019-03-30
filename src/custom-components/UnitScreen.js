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
import data from "../data/Unit1";

const { width } = Dimensions.get("window");

// const UnitScreen = (indexStart, indexEnd) => () => (
//   <Subscribe to={[WordStateContainer]}>
//     {container => {
//       if (container.state.favoriteDataLoaded) {
//         const dataProvider = new DataProvider(
//           (r1, r2) => r1 !== r2
//         ).cloneWithRows(
//           container.state.data.slice(indexStart, indexEnd).map(item => ({
//             type: "normal",
//             item
//           }))
//         );

//         const layoutProvider = new LayoutProvider(
//           i => dataProvider.getDataForIndex(i).type,
//           (type, dim) => {
//             switch (type) {
//               case "normal":
//                 dim.width = width;
//                 dim.height = 150;
//                 break;
//               default:
//                 dim.width = 0;
//                 dim.height = 0;
//                 break;
//             }
//           }
//         );

//         const rowRenderer = (_, data) => (
//           <View>
//             <WordCard cardData={data.item} index={data.item.id} />
//           </View>
//         );

//         return (
//           <React.Fragment>
//             <RecyclerListView
//               style={{ flex: 1, backgroundColor: "#e57373" }}
//               dataProvider={dataProvider}
//               layoutProvider={layoutProvider}
//               rowRenderer={rowRenderer}
//             />
//           </React.Fragment>
//         );
//       }
//       container.getFavoriteData();
//       return <Spinner visible />;
//     }}
//   </Subscribe>
// );
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
