import { Container } from "unstated";
import { AsyncStorage } from "react-native";
import pull from "lodash.pull";
import data from "../data/Unit1";
class WordStateContainer extends Container {
  state = {
    data,
    favoriteData: [],
    favoriteDataLoaded: false,
    storageIsInitialized: false
  };
  // initializeStorage = async () => {
  //   try {
  //     const defaultData = await AsyncStorage.getItem("data");
  //     if (!defaultData) {
  //       await this.setState({ data, storageIsInitialized: true });
  //       await AsyncStorage.setItem("data", JSON.stringify(data));
  //     } else {
  //       await this.setState({
  //         data: JSON.parse(defaultData),
  //         storageIsInitialized: true
  //       });
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };
  getFavoriteData = async () => {
    const defaultDataIndexes = await AsyncStorage.getItem(
      "favoriteDataIndexes"
    );
    if(defaultDataIndexes){
      const dataIndexes = JSON.parse(defaultDataIndexes);
      const favoriteData = [];
      const currentData = this.state.data;
      dataIndexes.forEach(item => {
        currentData[item].favorite = true;
        favoriteData.push(this.state.data[item]);
      })
      await this.setState({ favoriteData, favoriteDataLoaded: true });
    }
    await this.setState({favoriteDataLoaded: true})  
  };

  handleFavorite = async index => {
    try {
      const defaultDataIndexes = await AsyncStorage.getItem(
        "favoriteDataIndexes"
      );
      if (defaultDataIndexes) {
        const dataIndexes = JSON.parse(defaultDataIndexes);
        if (dataIndexes.includes(index)) {
          pull(dataIndexes, index);
          const data = this.state.data;
          data[index].favorite = false; 
          await this.setState({data});
        } else {
          dataIndexes.push(index);
          const data = this.state.data;
          data[index].favorite = true; 
          await this.setState({data});
        }
        await AsyncStorage.setItem(
          "favoriteDataIndexes",
          JSON.stringify(dataIndexes)
        );
      }else {
        const dataIndexes = [];
        dataIndexes.push(index);
        data[index].favorite = true;
        await this.setState({data});
        await AsyncStorage.setItem(
          "favoriteDataIndexes",
          JSON.stringify(dataIndexes)
        );
      }
      // if (defaultDataIndexes) {
      //   dataIndexes = JSON.parse(defaultDataIndexes);
      //   if(!(dataIndexes[newData.audio] == undefined)){
      //     dataIndexes[newData.audio] = undefined;
      //     this.state.data.forEach((item, index) => {
      //       if (!dataIndexes[item.audio] == undefined) {
      //         data[index].favorite = false;
      //       }
      //     });
      //     console.log("Xoa index");
      //     console.log(dataIndexes);
      // await AsyncStorage.setItem(
      //   "favoriteDataIndexes",
      //   JSON.stringify(dataIndexes)
      // );
      //   }
      //   else{
      //     dataIndexes[newData.audio] = newData.audio;

      //     this.state.data.forEach((item, index) => {
      //       if (!dataIndexes[item.audio] == undefined) {

      //         data[index].favorite = true;
      //       }
      //     });
      //     console.log("Them index");
      //     console.log(dataIndexes);
      //     await AsyncStorage.setItem(
      //       "favoriteDataIndexes",
      //       JSON.stringify(dataIndexes)
      //     );
      //     // console.log(data);
      //   }
      //   await this.setState({data});

      // } else {
      //   dataIndexes[newData.audio] = newData.audio;
      //   await AsyncStorage.setItem(
      //     "favoriteDataIndexes",
      //     JSON.stringify(dataIndexes)
      //   );
      // }
    } catch (error) {
      console.warn(error);
    }
  };
}
export default WordStateContainer;
