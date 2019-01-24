import { Container } from "unstated";
import { AsyncStorage } from "react-native";
import pull from "lodash.pull";
import data from "../data/Unit1";
class FavoriteWordContainer extends Container {
  state = {
    favoriteData: [],
    isInitialized: false
  };
  // initialData = async () => {
  //   try {
  //     const defaultData = await AsyncStorage.getItem("data");
  //     const data = JSON.parse(defaultData);
  //     await this.setState({data,isInitialized: true});
  //   } catch {
  //     console.warn("Cannot load data");
  //   }
  // }
  // storeData = async newData => {
  //   try {
  //     const defaultData = await AsyncStorage.getItem("data");
  //     let data;
  //     if (defaultData) {
  //       data = JSON.parse(defaultData);
  //     } else {
  //       data = [];
  //     }
  //     data.push(newData);
  //     await this.setState({data, isInitialized: true});
  //     await AsyncStorage.setItem("data", JSON.stringify(data));
  //   } catch {
  //     console.warn("Cannot store data");
  //   }
  // };
  // removeData = async removeData => {
  //   try {
  //     const defaultData = await AsyncStorage.getItem("data");
  //     let data;
  //     if (defaultData) {
  //       data = JSON.parse(defaultData);
  //     } else {
  //       data = [];
  //     }
  //     data.filter(arr => {
  //       return arr.audio != removeData.audio;
  //     });
  //     await this.setState({data, isInitialized: true});
  //     await AsyncStorage.setItem("data", JSON.stringify(data));
  //   } catch {
  //     console.warn("Cannot remove data");
  //   }
  // };
  getFavoriteData = async () => {
    const defaultDataIndexes = await AsyncStorage.getItem(
      "favoriteDataIndexes"
    );
    const dataIndexes = JSON.parse(defaultDataIndexes);
    const favoriteData = [];
    data.forEach(item => {
      if (!dataIndexes[item.audio] == undefined) {
        favoriteData.push(item);
      }
    });
    await this.setState({ favoriteData });
  };
  handleFavorite = async newData => {
    try {
      const defaultDataIndexes = await AsyncStorage.getItem(
        "favoriteDataIndexes"
      );
      const dataIndexes = {};
      if(!defaultDataIndexes){
        dataIndexes = JSON.parse(defaultDataIndexes);
      }else {
        dataIndexes[newData.audio] = newData.audio;
        return await AsyncStorage.setItem("favoriteDataIndexes", dataIndexes); 
      }
      let isIncluded = false;
      dataIndexes.forEach(item => {
        if (item == newData.audio) {
          isIncluded = true;
        }
      });
      if (isIncluded) {
        pull(dataIndexes, newData.audio);
      } else {
        dataIndexes.push(newData.audio);
      }
      data.forEach(item => {
        if (!dataIndexes[item.audio] == undefined) {
          item.favorite = true;
        }
      });

    } catch (error) {
      console.warn(error);
    }
  };
}
export default FavoriteWordContainer;
