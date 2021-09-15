import ReactDom from "react-dom";

function Modal({ children }: { children: React.ReactNode }): JSX.Element {
  // const modal = document.getElementById("modal") as HTMLElement;

  // useEffect(() => {
  //   document.getElementById("modal") as HTMLElement;
  //   return () => {
  //     document.removeChild(modal);
  //   };
  // }, []);

  return ReactDom.createPortal(<>{children}</>, document.getElementById("modal")!);
}
export default Modal;
