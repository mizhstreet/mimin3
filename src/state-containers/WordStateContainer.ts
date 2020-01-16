import { Container } from "unstated";
import { AsyncStorage } from "react-native";
import pull from "lodash.pull";
import data from "../data/data";
import { IWord } from "../types/IWord";

interface IState {
  words: IWord[];
  favoriteWords: IWord[];
  isFavoriteLoaded: boolean;
}
class WordStateContainer extends Container<IState> {
  state: IState = {
    words: data,
    favoriteWords: [],
    isFavoriteLoaded: false
  };

  getFavoriteData = async () => {
    const currentFavoriteIndexes = await AsyncStorage.getItem(
      "favoriteWordsIndexes"
    );
    if (currentFavoriteIndexes) {
      const favoriteIndexes = JSON.parse(currentFavoriteIndexes) as number[];
      const favoriteWords: IWord[] = [];
      const words = this.state.words;

      favoriteIndexes.forEach(item => {
        words[item].favorite = true;
        favoriteWords.unshift(this.state.words[item]);
      });
      await this.setState({ favoriteWords, isFavoriteLoaded: true });
    } else {
      await this.setState({ isFavoriteLoaded: true });
    }
  };

  handleFavorite = async (index: number) => {
    try {
      const currentFavoriteIndexes = await AsyncStorage.getItem(
        "favoriteWordsIndexes"
      );
      if (currentFavoriteIndexes) {
        const favoriteIndexes = JSON.parse(currentFavoriteIndexes);
        if (favoriteIndexes.includes(index)) {
          pull(favoriteIndexes, index);

          await this.setState(prevState => {
            const newData = prevState.words;

            newData[index].favorite = false;

            return {
              words: newData,
              favoriteWords: prevState.favoriteWords.filter(
                item => item.id !== prevState.words[index].id
              )
            };
          });
        } else {
          favoriteIndexes.push(index);

          await this.setState(prevState => {
            const newFavoriteData = prevState.favoriteWords;

            const newData = prevState.words;
            newData[index].favorite = true;

            newFavoriteData.unshift(prevState.words[index]);
            return {
              data: newData,
              favoriteWords: newFavoriteData
            };
          });
        }
        await AsyncStorage.setItem(
          "favoriteWordsIndexes",
          JSON.stringify(favoriteIndexes)
        );
      } else {
        const favoriteIndexes = [];
        favoriteIndexes.push(index);

        const currentData = this.state.words;
        currentData[index].favorite = true;

        await this.setState(() => {
          const newFavoriteData = [];
          newFavoriteData.unshift(currentData[index]);

          return {
            data: currentData,
            favoriteWords: newFavoriteData
          };
        });
        await AsyncStorage.setItem(
          "favoriteWordsIndexes",
          JSON.stringify(favoriteIndexes)
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };
}
export default WordStateContainer;
