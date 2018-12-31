import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';
const DrawerContent = (props) => {
  return(
    <ScrollView>
      <SafeAreaView>
        <View style={styles.drawerHeader}>
          <View style={styles.avatar}>
            <MaterialIcons size={30} name="mood" />
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  drawerHeader: {
    height: 200,
    flex: 1,
    backgroundColor: "blue",
    justifyContent: 'flex-end'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "red",
    marginBottom: 25,
    marginLeft: 15
  }
})
export default DrawerContent;
