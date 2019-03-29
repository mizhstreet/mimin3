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

  handleFavorite = async index => {
    try {
      const defaultDataIndexes = await AsyncStorage.getItem(
        "favoriteDataIndexes"
      );
      if (defaultDataIndexes) {
        const dataIndexes = JSON.parse(defaultDataIndexes);
        if (dataIndexes.includes(index)) {
          // delete data if exits
          pull(dataIndexes, index);
          await this.setState(prevState => ({
            data: prevState.data.map((item, itemIndex) => {
              if (itemIndex === index) {
                const currentItem = item;
                currentItem.favorite = false;
                return currentItem;
              }
              return item;
            }),
            favoriteData: prevState.favoriteData.filter(
              item => item.id !== prevState.data[index].id
            )
          }));
        } else {
          dataIndexes.push(index);
          await this.setState(prevState => {
            const newFavoriteData = prevState.favoriteData;
            newFavoriteData.unshift(prevState.data[index]);
            return {
              data: prevState.data.map((item, itemIndex) => {
                if (itemIndex === index) {
                  const currentItem = item;
                  currentItem.favorite = true;
                  return currentItem;
                }
                return item;
              }),
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
        const { data } = this.state;
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
