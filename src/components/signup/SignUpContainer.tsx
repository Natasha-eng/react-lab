import Modal from "../modal/Modal";
import SignUp from "./SignUp";

interface ISignUpContainer {
  toggleSignUp: () => void;
}

export default function SignUpContainer(props: ISignUpContainer): JSX.Element {
  return (
    <Modal>
      <SignUp toggleSignUp={props.toggleSignUp} />
    </Modal>
  );
}
