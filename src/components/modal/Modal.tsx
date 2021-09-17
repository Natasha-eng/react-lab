import ReactDom from "react-dom";

function Modal({ children }: { children: React.ReactNode }): JSX.Element {
  return ReactDom.createPortal(<>{children}</>, document.getElementById("modal")!);
}
export default Modal;
