import Modal from "../modal/Modal";
import PasswordModal from "./PasswordModal";

interface IPasswordModalContainer {
  togglePasswordModal: () => void;
}

export default function PasswordModalContainer(props: IPasswordModalContainer): JSX.Element {
  return (
    <Modal>
      <PasswordModal togglePasswordModal={props.togglePasswordModal} />
    </Modal>
  );
}
