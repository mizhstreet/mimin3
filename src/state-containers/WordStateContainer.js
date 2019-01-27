import { Container } from "unstated";
import { AsyncStorage } from "react-native";
import pull from "lodash.pull";
import data from "../data/Unit1";
class WordStateContainer extends Container {
  state = {
    data,
    favoriteData: [],
    favoriteDataLoaded: false
  };
  getFavoriteData = async () => {
    const defaultDataIndexes = await AsyncStorage.getItem(
      "favoriteDataIndexes"
    );
    if (defaultDataIndexes) {
      const dataIndexes = JSON.parse(defaultDataIndexes);
      const favoriteData = [];
      const currentData = this.state.data;
      dataIndexes.forEach(item => {
        currentData[item].favorite = true;
        favoriteData.unshift(this.state.data[item]);
      });
      await this.setState({ favoriteData, favoriteDataLoaded: true });
    }
    await this.setState({ favoriteDataLoaded: true });
  };
  removeFavorite = (index) => {
    const favoriteData = this.state.favoriteData;
    favoriteData.splice(0,1);
    // console.log(favoriteData);
    this.setState({favoriteData});
  }
  
  handleFavorite = async index => {
    try {
      const defaultDataIndexes = await AsyncStorage.getItem(
        "favoriteDataIndexes"
      );
      if (defaultDataIndexes) {
        const dataIndexes = JSON.parse(defaultDataIndexes);
        if (dataIndexes.includes(index)) {
          //delete data if exits
          pull(dataIndexes, index);
          const data = this.state.data;
          data[index].favorite = false;
          //set handle favorite data
          const favoriteData = [];
          dataIndexes.forEach(item => {
            data[item].favorite = true;
            favoriteData.unshift(data[item]);
          });
          await this.setState({ data, favoriteData });
        } else {
          //pushing data to array
          dataIndexes.push(index);
          const data = this.state.data;
          data[index].favorite = true;
          // set the favorite
          const favoriteData = [];
          dataIndexes.forEach(item => {
            data[item].favorite = true;
            favoriteData.unshift(data[item]);
          });
          await this.setState({ data, favoriteData });
        }
        await AsyncStorage.setItem(
          "favoriteDataIndexes",
          JSON.stringify(dataIndexes)
        );
      } else {
        const dataIndexes = [];
        dataIndexes.push(index);
        const data = this.state.data;
        data[index].favorite = true;
        const favoriteData = [];
        dataIndexes.forEach(item => {
          data[item].favorite = true;
          favoriteData.unshift(data[item]);
        });
        await this.setState({ data, favoriteData });
        await AsyncStorage.setItem(
          "favoriteDataIndexes",
          JSON.stringify(dataIndexes)
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };
}
export default WordStateContainer;
