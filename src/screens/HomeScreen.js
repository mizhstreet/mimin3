import React from 'react';
import {FlatList} from 'react-native';
import WordCard from '../components/WordCard';
import Modal from '../components/Modal';
import data from '../data/Unit1';
export default class HomeScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FlatList style={{backgroundColor: "#e57373"}}
          data={data}
          renderItem={
            ({item}) => (
              <WordCard cardData={item}/>
            )
          }
          keyExtractor={(_, index) => index.toString()}
          overScrollMode="always"/>
        <Modal/>
      </React.Fragment>
    );
  }
}
