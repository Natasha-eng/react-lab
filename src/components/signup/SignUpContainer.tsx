// eslint-disable-next-line no-use-before-define
import React from "react";
import Modal from "../modal/Modal";
import SignUp from "./SignUp";

interface ISignUpContainer {
  toggleSignUp: () => void;
}

const SignUpContainer = React.memo(
  (props: ISignUpContainer): JSX.Element => (
    <Modal>
      <SignUp toggleSignUp={props.toggleSignUp} />
    </Modal>
  )
);

export default SignUpContainer;
