import React from "react";
import { FlatList, View, Text } from "react-native";
import { Subscribe } from "unstated";
import WordCard from "../components/WordCard";
import WordStateContainer from "../state-containers/WordStateContainer";

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
      return (
        <React.Fragment>
          <FlatList
            style={{ backgroundColor: "#e57373" }}
            data={container.state.favoriteData}
            renderItem={({ item }) => (
              <WordCard cardData={item} index={item.id} />
            )}
            keyExtractor={(_, index) => index.toString()}
            overScrollMode="always"
          />
        </React.Fragment>
      );
    }}
  </Subscribe>
);
export default FavoriteScreen;
