// eslint-disable-next-line no-use-before-define
import React from "react";
import Modal from "@/components/modal/Modal";
import { GameType } from "app/interfcaces/interfaces";
import UpdateGameModal from "./UpdateGameModal";

interface ICreateGameModalr {
  toggleModal: () => void;
  updateGameHandler: (updatedGame: GameType) => void;
}

const UpdateGameModalContainer = React.memo(
  (props: ICreateGameModalr): JSX.Element => (
    <Modal>
      <UpdateGameModal  toggleModal={props.toggleModal} updateGameHandler={props.updateGameHandler} />
    </Modal>
  )
);

export default UpdateGameModalContainer;
