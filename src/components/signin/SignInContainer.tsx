// eslint-disable-next-line no-use-before-define
import React from "react";
import Modal from "../modal/Modal";
import SignIn from "./SignIn";

interface ISignInContainer {
  toggleSignIn: () => void;
}

const SignInContainer = React.memo(
  (props: ISignInContainer): JSX.Element => (
    <Modal>
      <SignIn toggleSignIn={props.toggleSignIn} />
    </Modal>
  )
);

export default SignInContainer;
