// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode, useContext } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/home/Home";
import Products from "./products/Products";
import Footer from "./components/footer/footer";
import { path } from "./components/header/header";
import { store } from "./app/store";
import About from "./components/about/About";
import mainStyle from "./styles/main.module.css";
import HeaderContainer from "./components/header/HeaderContainer";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Profile from "./components/profile/Profile";


interface AppProps {
  nothing: boolean;
}
interface AppState {
  hasError: boolean;
}

function App() {
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);

  return (
    <div>
      <HeaderContainer />

      <div className={mainStyle.container}>
        <Switch>
          <Route path={path.home} render={(routeProps: RouteComponentProps) => <Home {...routeProps} />} />
          <ProtectedRoute path={path.products} isSignedIn={isSignedIn}>
            <Products />
          </ProtectedRoute>

          {/* <Route path="/products" render={() => <Products />} /> */}
          {/* <Route path="/products/:category" render={() => <Products />} /> */}
          {/* <Route path={path.about} render={() => <About />} /> */}
          <ProtectedRoute path={path.about} isSignedIn={isSignedIn}>
            <About />
          </ProtectedRoute>
          <Route path={path.profile} render={() => <Profile isSignedIn={isSignedIn} />} />
          <Redirect from="*" to={path.home} />
          <Redirect to={path.profile} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    console.log("componentDidCatch");
    alert("error occured ");
    console.error();
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      <Redirect to="/home" />;
    }
    return (
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
      <AppContainer nothing={false} />
  </Provider>,
  document.getElementById("app")
);
