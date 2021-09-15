import { ChangeEvent, FocusEvent } from "react";
import inputStyles from "./inputText.module.css";

interface IInputText {
  name: string;
  type: string;
  label: string;
  value: string;
  error: string;
  onChangeValueHandler: (value: string) => void;
  onBlurHander: (value: string) => void;
}

export default function InputText(props: IInputText): JSX.Element {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeValueHandler(e.target.value);
  };

  const onBLurInputHandler = (e: FocusEvent<HTMLInputElement>) => {
    props.onBlurHander(e.target.value);
  };
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
      {props.error && <div className={inputStyles.error}>{props.error}</div>}
    </div>
  );
}
