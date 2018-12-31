import React from 'react';
import {ScrollView, Text, Button, View, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import WordCard from '../components/WordCard';
import Modal from '../components/Modal';
import data from '../data/Unit1';
export default class HomeScreen extends React.Component {
  state = {
    modalVisible: false,
    modalData: {}
  }
  handleVisible = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }
  setModalData = (args) => {
    this.setState({modalData: args})
  }
  render() {
    return (
      <React.Fragment>
        <ScrollView style={{backgroundColor: "#e57373"}}>
          {
            data.map((w, key) => {
              return(
                <WordCard key={key} cardData={w} setModalData={this.setModalData} handleVisible={this.handleVisible}/>
              )
            })
          }
        </ScrollView>
        <Modal data={this.state.modalData} handleVisible={() => this.handleVisible()} visible={this.state.modalVisible} />
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  modalWrapper: {
    width: 350,
    height: 500
  }
})
