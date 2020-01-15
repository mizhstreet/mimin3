import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { DrawerItems } from "react-navigation-drawer";
import background from "../assets/images/maxresdefault.jpg";

const styles = StyleSheet.create({
  drawerHeader: {
    height: 200,
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "flex-end"
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "red",
    marginBottom: 25,
    marginLeft: 15
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  }
});

const DrawerContent: React.FC<any> = props => (
  <ScrollView>
    <SafeAreaView>
      <View style={styles.drawerHeader}>
        <Image style={styles.image} source={background} />
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export default DrawerContent;
