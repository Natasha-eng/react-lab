// eslint-disable-next-line no-use-before-define
import React from "react";
import loader from "../../assets/images/loading-icon.jpg";
import main from "../../styles/main.module.css";

interface IPreloader {
  className: string;
}

const Preloader = React.memo(
  (props: IPreloader): JSX.Element => (
    <div className={`${props.className} ${main.loader} `}>
      <img src={loader} alt="loader" />
    </div>
  )
);
export default Preloader;
