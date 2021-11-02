import Modal from "@/components/modal/Modal";
import { GameType } from "@/types/types";
import UpdateGameModal from "./UpdateGameModal";

interface ICreateGameModalr {
  toggleModal: () => void;
  updateGameHandler: (updatedGame: GameType) => void;
}

export default function UpdateGameModalContainer(props: ICreateGameModalr): JSX.Element {
  return (
    <Modal>
      <UpdateGameModal toggleModal={props.toggleModal} updateGameHandler={props.updateGameHandler} />
    </Modal>
  );
}
