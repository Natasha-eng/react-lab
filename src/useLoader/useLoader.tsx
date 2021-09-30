import Preloader from "@/elements/preloader/Preloader";
import { ReactNode, useState } from "react";
import main from "../styles/main.module.css";

export default function useLoader(children: ReactNode) {
  const [loader, setLoader] = useState(false);

  const setLoaderHandler = (value: boolean) => {
    setLoader(value);
  };

  const ComponentWithLoader = (
    <>
      <Preloader className={`${loader ? main.show : main.hide}`} />
      <div className={`${loader ? main.hide : main.show}`}>{children}</div>
    </>
  );

  return { setLoaderHandler, ComponentWithLoader };
}
