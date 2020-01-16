import { Container } from "unstated";
import { Audio } from "expo-av";

interface IState {
  player: Audio.Sound;
  isPlaying: boolean;
}

class WordSoundContainer extends Container<IState> {
  state = {
    player: new Audio.Sound(),
    isPlaying: false
  };

  loadSound = async (audio: any) => {
    try {
      if (!this.state.isPlaying) {
        await this.setState({ isPlaying: true });
        await this.state.player.unloadAsync();
        await this.state.player.loadAsync(audio);
        await this.state.player.replayAsync();
        await this.setState({ isPlaying: false });
      }
    } catch (err) {
      console.warn(err);
    }
  };
}
export default WordSoundContainer;
