import React from "react";
import { Subscribe } from "unstated";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Animated
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WordSoundContainer from "../state-containers/WordSoundContainer";
import ModalStateContainer from "../state-containers/ModalStateContainer";
import WordStateContainer from "../state-containers/WordStateContainer";
const ANIMATION_DURATION = 250;

export default class AnimatedWordCard extends React.Component {
  constructor(props) {
    super(props);

    this._animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onRemove = () => {
    Animated.timing(this._animated, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start();
  };
  
  render() {
    const {
      audio,
      kanji,
      hira,
      exampleAudio,
      vn,
      meaning,
      example,
      exampleMeaning
    } = this.props.cardData;
    const cardStyle = [
      styles.card,
      { opacity: this._animated },
      // {
      //   transform: [
      //     { scale: this.state._animated },
      //     {
      //       rotate: this.state._animated.interpolate({
      //         inputRange: [0, 1],
      //         outputRange: ["35deg", "0deg"],
      //         extrapolate: "clamp"
      //       })
      //     }
      //   ]
      // }
    ];
    return (
      <Animated.View style={cardStyle}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.kanji}>{kanji}</Text>
            <Text style={styles.vn}>{vn}</Text>
          </View>
          <Text style={styles.hira}>{hira}</Text>
          <Text style={styles.hira}>{meaning}</Text>
        </View>
        <View style={styles.cardButton}>
          <View style={styles.buttonWrapper}>
            <Subscribe to={[WordStateContainer]}>
              {container => {
                return (
                  <TouchableNativeFeedback
                    onPress={async () => {
                      // await container.removeFavorite(this.props.index);
                      await this.onRemove();
                      await container.handleFavorite(this.props.index);
                    }}
                    background={TouchacardStylebleNativeFeedback.SelectableBackground()}
                  >
                    <View style={styles.iconWrapper}>
                      <MaterialIcons
                        name={
                          this.props.cardData.favorite
                            ? "favorite"
                            : "favorite-border"
                        }
                        size={23}
                      />
                    </View>
                  </TouchableNativeFeedback>
                );
              }}
            </Subscribe>
          </View>
          <View style={styles.buttonWrapper}>
            <Subscribe to={[ModalStateContainer]}>
              {modalData => (
                <TouchableNativeFeedback
                  onPress={async () => {
                    await modalData.setData({
                      kanji,
                      hira,
                      meaning,
                      vn,
                      example,
                      exampleMeaning,
                      exampleAudio
                    });
                    await modalData.handleVisible();
                  }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                >
                  <View style={styles.iconWrapper}>
                    <MaterialIcons name="menu" size={23} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </Subscribe>
          </View>
          <View style={styles.buttonWrapper}>
            <Subscribe to={[WordSoundContainer]}>
              {player => (
                <TouchableNativeFeedback
                  onPress={async () => {
                    await player.loadSound(audio);
                  }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                >
                  <View style={styles.iconWrapper}>
                    <MaterialIcons name="volume-up" size={23} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </Subscribe>
          </View>
        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    elevation: 5,
    borderColor: "gray",
    marginTop: 7,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7
  },
  cardHeader: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  cardContent: {
    overflow: "hidden",
    flex: 1
  },
  kanji: {
    fontWeight: "700",
    fontSize: 22,
    alignSelf: "center",
    marginRight: 20
  },
  vn: {
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "center"
  },
  hira: {
    fontSize: 18,
    color: "#6d6d6d",
    marginVertical: 5
  },
  cardButton: {
    width: 30
  },
  buttonWrapper: {
    borderRadius: 15,
    overflow: "hidden"
  },
  iconWrapper: {
    borderColor: "red",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
