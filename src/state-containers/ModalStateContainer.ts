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

  setData = async (data: Partial<IState>) => {
    await this.setState({
      ...data
    });
  };

  handleVisibility = async () => {
    await this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };
}
export default ModalStateContainer;
