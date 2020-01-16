import * as React from "react";
import { Subscribe } from "unstated";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WordSoundContainer from "../state-containers/WordSoundContainer";
import ModalStateContainer from "../state-containers/ModalStateContainer";
import WordStateContainer from "../state-containers/WordStateContainer";
import { IWord } from "../types/IWord";

const styles = StyleSheet.create({
  card: {
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
    marginBottom: 7,
    height: 140
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

export default class WordCard extends React.PureComponent<IWord> {
  render() {
    const {
      id,
      audio,
      kanji,
      hira,
      exampleAudio,
      vn,
      meaning,
      example,
      exampleMeaning
    } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.kanji}>{`${id + 1}. ${kanji}`}</Text>
            <Text style={styles.vn}>{vn}</Text>
          </View>
          <Text style={styles.hira}>{hira}</Text>
          <Text style={styles.hira}>{meaning}</Text>
        </View>
        <View style={styles.cardButton}>
          <View style={styles.buttonWrapper}>
            <Subscribe to={[WordStateContainer]}>
              {(wordContainer: WordStateContainer) => (
                <TouchableNativeFeedback
                  onPress={async () => {
                    await wordContainer.handleFavorite(id);
                  }}
                  background={TouchableNativeFeedback.SelectableBackground()}
                >
                  <View style={styles.iconWrapper}>
                    <MaterialIcons
                      name={
                        wordContainer.state.words[id].favorite
                          ? "favorite"
                          : "favorite-border"
                      }
                      size={23}
                    />
                  </View>
                </TouchableNativeFeedback>
              )}
            </Subscribe>
          </View>
          <View style={styles.buttonWrapper}>
            <Subscribe to={[ModalStateContainer]}>
              {(modal: ModalStateContainer) => (
                <TouchableNativeFeedback
                  onPress={() => {
                    modal.setData({
                      kanji,
                      hira,
                      meaning,
                      vn,
                      example,
                      exampleMeaning,
                      exampleAudio
                    });
                    modal.handleVisibility();
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
              {(player: WordSoundContainer) => (
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
      </View>
    );
  }
}
