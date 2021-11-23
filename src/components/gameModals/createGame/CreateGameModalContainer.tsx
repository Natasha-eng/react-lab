// eslint-disable-next-line no-use-before-define
import React from "react";
import Modal from "@/components/modal/Modal";
import { GameType } from "app/interfcaces/interfaces";
import CreateGameModal from "./CreateGameModal";

interface ICreateGameModalr {
  toggleModal: () => void;
  createGameHandler: (updatedGame: GameType) => void;
}

const CreateGameModalContainer = React.memo((props: ICreateGameModalr) => (
  <Modal>
    <CreateGameModal toggleModal={props.toggleModal} createGameHandler={props.createGameHandler} />
  </Modal>
));

export default CreateGameModalContainer;
