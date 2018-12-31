import React, {Component} from 'react';
import {Audio} from 'expo';
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,
    TouchableNativeFeedback} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import Furi from 'react-native-furi';
import Dialog, {DialogContent, ScaleAnimation} from 'react-native-popup-dialog';
class Modal extends React.Component{
  playSound = async () => {
    await this.props.data.exampleAudio.replayAsync();
  }
  render(){
    const {
      visible,
      handleVisible,
      data: {
        kanji,
        hira,
        meaning,
        vn,
        example,
        exampleMeaning
      }
    } = this.props;
    return (
      <View>
        <Dialog visible={visible} onTouchOutside={handleVisible} dialogStyle={styles.dialogWrapper} dialogAnimation={new ScaleAnimation()}>
          <DialogContent style={styles.dialogContent}>
            <View style={styles.dialogHeader}>
              <TouchableWithoutFeedback onPress={handleVisible}>
                <View style={styles.closeBtnWrapper}>
                  <MaterialIcons name="close" size={24} color='#fff'/>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.dialogBody}>
              <View style={styles.dialogHeading}>
                <Text style={styles.kanji}>{kanji}</Text>
                <Text style={styles.meaning}>{meaning}</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableNativeFeedback onPress={() => {
                    this.playSound();
                  }} background={TouchableNativeFeedback.SelectableBackground()}>
                  <View style={styles.iconWrapper}>
                    <MaterialIcons name="volume-up" size={23}/>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <Text>Ví dụ:</Text>
              <Text style={styles.example}>{example}</Text>
              <Text style={styles.hira}>{exampleMeaning}</Text>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  dialogWrapper: {
    width: width > 450
      ? width * 8 / 10
      : width - 20,
    height: height * 5 / 10,
    marginTop: height * 1.2 / 10,
    backgroundColor: '#e57373',
    borderRadius: 10
  },
  dialogContent: {
    paddingLeft: 0,
    paddingRight: 0,
    height: '100%',
    flexDirection: 'column'
  },
  dialogBody: {
    paddingTop: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingBottom: 20
  },
  dialogHeading: {
    paddingBottom: 5
  },
  dialogHeader: {
    alignItems: 'flex-end'
  },
  kanji: {
    fontWeight: '700',
    fontSize: 25,
    alignSelf: 'center',
    marginRight: 20
  },
  example: {
    fontSize: 17,
    color: "#424242",
    marginVertical: 4,
    fontWeight: '700'
  },
  meaning: {
    fontWeight: '700',
    fontSize: 17,
    alignSelf: 'center'
  },
  hira: {
    fontSize: 17,
    color: "#424242",
    marginVertical: 4
  },
  closeBtnWrapper: {
    marginRight: 5,
    marginTop: 4
  },
  buttonWrapper: {
    overflow: "hidden"
  },
  iconWrapper: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default Modal;
