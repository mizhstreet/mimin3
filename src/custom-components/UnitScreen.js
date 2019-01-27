import React from "react";
import { FlatList, View, Animated } from "react-native";
import { Subscribe } from "unstated";
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import Spinner from "react-native-loading-spinner-overlay";
import WordCard from "../components/WordCard";
import Modal from "../components/Modal";
import WordStateContainer from "../state-containers/WordStateContainer";
export const UnitScreen = (indexStart, indexEnd) => {
  return class extends React.Component {
    render() {
      return (
        <Subscribe to={[WordStateContainer]}>
          {container => {
            if (container.state.favoriteDataLoaded) {
              return (
                <React.Fragment>
                  <Modal />
                  <FlatList
                    style={{ backgroundColor: "#e57373" }}
                    data={container.state.data.slice(indexStart,indexEnd)}
                    renderItem={({ item }) => (
                      <WordCard cardData={item} index={item.id} />
                    )}
                    removeClippedSubviews 
                    disableVirtualization
                    keyExtractor={(_, index) => index.toString()}
                    overScrollMode="always"
                  />
                  
                </React.Fragment>
              );
            } else {
              container.getFavoriteData();
              return <Spinner visible={true} />;
            }
          }}
        </Subscribe>
      );
    }
  };
};

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Subscribe to={[WordStateContainer]}>
        {container => {
          if (container.state.favoriteDataLoaded) {
            return (
              <React.Fragment>
                <FlatList
                  style={{ backgroundColor: "#e57373" }}
                  data={container.state.data}
                  renderItem={({ item, index }) => (
                    <WordCard cardData={item} index={index} />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  overScrollMode="always"
                />
                <Modal />
              </React.Fragment>
            );
          } else {
            container.getFavoriteData();
            return <Spinner visible={true} />;
          }
        }}
      </Subscribe>
    );
  }
}
