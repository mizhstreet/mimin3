import {Container} from 'unstated';
import {Audio} from 'expo';
class WordSoundContainer extends Container{
  state = {
    player: null,
    isPlaying: false
  }
  loadSound = async (audio) => {
    try {
      if(this.state.player == null){
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(audio);
        await this.setState({
          player: soundObject
        })
        this.playSound();
      }
      else {
        if(!this.state.isPlaying){
          await this.setState({isPlaying: true});
          await this.state.player.unloadAsync();
          await this.state.player.loadAsync(audio);
          await this.playSound();
          await this.setState({isPlaying: false})
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }
  playSound = async () => {
    try {
      await this.state.player.replayAsync();
    } catch (err) {
      console.warn(err);
    }
  }
}
export default WordSoundContainer;
