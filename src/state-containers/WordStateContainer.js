import { Container } from "unstated";
import { AsyncStorage } from "react-native";
import pull from "lodash.pull";
import data from "../data/Unit1";

class WordStateContainer extends Container {
  constructor() {
    super();
    this.state = {
      data,
      favoriteData: [],
      favoriteDataLoaded: false
    };
  }

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

  handleFavorite = async index => {
    try {
      const defaultDataIndexes = await AsyncStorage.getItem(
        "favoriteDataIndexes"
      );
      if (defaultDataIndexes) {
        const dataIndexes = JSON.parse(defaultDataIndexes);
        if (dataIndexes.includes(index)) {
          pull(dataIndexes, index);
          await this.setState(prevState => {
            const newData = prevState.data;
            newData[index].favorite = false;
            return {
              data: newData,
              favoriteData: prevState.favoriteData.filter(
                item => item.id !== prevState.data[index].id
              )
            };
          });
        } else {
          dataIndexes.push(index);
          await this.setState(prevState => {
            const newFavoriteData = prevState.favoriteData;
            const newData = prevState.data;
            newData[index].favorite = true;
            newFavoriteData.unshift(prevState.data[index]);
            return {
              data: newData,
              favoriteData: newFavoriteData
            };
          });
        }
        await AsyncStorage.setItem(
          "favoriteDataIndexes",
          JSON.stringify(dataIndexes)
        );
      } else {
        const dataIndexes = [];
        dataIndexes.push(index);
        const currentData = this.state.data;
        currentData[index].favorite = true;
        await this.setState(() => {
          const newFavoriteData = [];
          newFavoriteData.unshift(currentData[index]);
          return {
            data: currentData,
            favoriteData: newFavoriteData
          };
        });
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
