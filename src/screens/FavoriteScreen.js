import React from "react";
import { FlatList, View, Text } from "react-native";
import { Subscribe } from "unstated";
import WordCard from "../components/WordCard";
import Modal from "../components/Modal";
import FavoriteWordContainer from "../state-containers/FavoriteWordContainer";
import WordStateContainer from "../state-containers/WordStateContainer";
export default class FavoriteScreen extends React.Component {
  render() {
    return (
      <View>
        <Subscribe to={[WordStateContainer]}>
          {container => {
            if (!container.state.favoriteData) {
              return (
                <View>
                  <Text>no favorite data</Text>
                </View>
              );
            } else {
              return (
                <React.Fragment>
                  <FlatList
                    style={{ backgroundColor: "#e57373" }}
                    data={container.state.favoriteData}
                    renderItem={({ item }) => <WordCard cardData={item} />}
                    keyExtractor={(_, index) => index.toString()}
                    overScrollMode="always"
                  />
                  <Modal />
                </React.Fragment>
              );
            }
          }}
        </Subscribe>
        <Modal />
      </View>
    );
  }
}
