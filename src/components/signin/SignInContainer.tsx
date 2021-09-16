import Modal from "../modal/Modal";
import SignIn from "./SignIn";

interface ISignInContainer {
  toggleSignIn: () => void;
}

export default function SignInContainer(props: ISignInContainer): JSX.Element {
  return (
    <Modal>
      <SignIn toggleSignIn={props.toggleSignIn} />
    </Modal>
  );
}
