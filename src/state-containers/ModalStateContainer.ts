import { Container } from "unstated";
import { IWord } from "../types/IWord";

interface IState extends Omit<IWord, "audio" | "id"> {
  visible: boolean;
}

class ModalStateContainer extends Container<IState> {
  state: IState = {
    kanji: "",
    hira: "",
    meaning: "",
    vn: "",
    example: "",
    exampleMeaning: "",
    exampleAudio: "",
    visible: false
  };

  setData = (data: Partial<IState>) => {
    this.setState({
      ...data
    });
  };

  handleVisible = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };
}
export default ModalStateContainer;
