import {Container} from 'unstated';
class ModalStateContainer extends Container{
  state = {
    kanji : null,
    hira: null,
    meaning: null,
    vn: null,
    example: null,
    furi: null,
    exampleMeaning: null,
    exampleAudio: null,
    visible: false
  }
  setData = (data) => {
    this.setState({
      ...data
    });
  }
  handleVisible = () => {
    this.setState({visible: !this.state.visible})
  }
}
export default ModalStateContainer;
