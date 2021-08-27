import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import imgSmall from "images/testSmall.png"; // start-path is 'images' because we have an alias 'images' in webpack.common.js
import imgCamera from "images/camera.svg";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import style from "./styles/main.module.css";
import someTypeScript from "./someTypeScript";
import Header, { path } from "./components/header/header";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Footer from "./components/footer/footer";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

function App() {
  return (
    <>
      <Header />
      <div>
        <Switch>
          <Route path={path.home} render={() => <Home />} />
          <Route path={path.products} render={() => <Products />} />
          <Route path={path.about} render={() => <About />} />
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      title: someTypeScript("Test-block for css-modules"),
    };
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <App />
          <div className="test-block">
            <h2 className={style.mainTitle}>{this.state.title}</h2>
          </div>
          <div className={["test-block", style.background].join(" ")}>
            <h2>Test-block for url-loader</h2>
            <img src={imgSmall} alt="smallImage" />
          </div>
          {/*  or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>
        */}
          <div className={["test-block", style.svgBackground].join(" ")}>
            <h2>Test-block for svg-url-loader</h2>
            <img src={imgCamera} alt="small_SVG_Image" />
          </div>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
