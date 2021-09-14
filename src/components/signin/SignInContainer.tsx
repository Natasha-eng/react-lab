import Modal from "../modal/Modal";
import SignInWithContext from "./SignInWithContext";

interface ISignInContainer {
  toggleSignIn: () => void;
}

export default function SignInContainer(props: ISignInContainer): JSX.Element {
  return (
    <Modal>
      <SignInWithContext toggleSignIn={props.toggleSignIn} />
    </Modal>
  );
}
