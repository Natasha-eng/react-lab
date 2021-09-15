import { withRouter } from "react-router-dom";
import main from "../../styles/main.module.css";

function About(): JSX.Element {
  return <div className={main.container}>About page</div>;
}

export default withRouter(About);
