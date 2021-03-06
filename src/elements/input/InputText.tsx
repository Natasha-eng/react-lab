// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, FocusEvent, useCallback } from "react";
import inputStyles from "./css/inputText.module.css";
import main from "../../styles/main.module.css";

interface IInputText {
  name: string;
  type: string;
  label: string;
  value: string;
  error: string;
  onChangeValueHandler: (value: string) => void;
  onBlurHander: (value: string) => void;
}

const InputText = React.memo((props: IInputText): JSX.Element => {
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.onChangeValueHandler(e.target.value);
    },
    [props.onChangeValueHandler]
  );

  const onBLurInputHandler = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      props.onBlurHander(e.target.value);
    },
    [props.onBlurHander]
  );
  return (
    <div className={inputStyles.inputWrapper}>
      <div className={inputStyles.input}>
        <label htmlFor={props.name}>{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={onChangeHandler}
          onBlur={onBLurInputHandler}
        />
      </div>
      {props.error && <div className={main.error}>{props.error}</div>}
    </div>
  );
});

export default InputText;
