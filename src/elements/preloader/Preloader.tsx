import loader from "../../assets/images/loading-icon.jpg";
import main from "../../styles/main.module.css";

interface IPreloader {
  className: string;
}

export default function Preloader(props: IPreloader): JSX.Element {
  return (
    <div className={`${props.className} ${main.loader} `}>
      <img src={loader} alt="loader" />
    </div>
  );
}
