import Modal from "@/components/modal/Modal";
import { GameType } from "@/types/types";
import CreateGameModal from "./CreateGameModal";

interface ICreateGameModalr {
  toggleModal: () => void;
  createGameHandler: (updatedGame: GameType) => void;
}

export default function CreateGameModalContainer(props: ICreateGameModalr) {
  return (
    <Modal>
      <CreateGameModal toggleModal={props.toggleModal} createGameHandler={props.createGameHandler} />
    </Modal>
  );
}
