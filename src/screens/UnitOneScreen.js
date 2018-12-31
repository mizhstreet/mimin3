import React from 'react';
import {Text, ScrollView, Button, TouchableNativeFeedback, View} from 'react-native';
export default class UnitOneScreen extends React.Component{
  render() {
    return (
      <ScrollView>
        <TouchableNativeFeedback
          onPress={() => alert("Save success")}
          background={TouchableNativeFeedback.SelectableBackground()}>
            <View>
                <Text style={{fontSize: 20}}>Button</Text>
            </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }
}
