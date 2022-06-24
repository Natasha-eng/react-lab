// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// eslint-disable-next-line no-use-before-define
import React, { Component, StrictMode, useEffect, useMemo } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import Footer from "./components/footer/footer";
import { store } from "./app/store";
import mainStyle from "./styles/main.module.css";
import HeaderContainer from "./components/header/HeaderContainer";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { AppRootState } from "./app/storetype";
import { path } from "./constants/constants";
import Preloader from "./elements/preloader/Preloader";
import { fetchCartThunkCreator } from "./thunks/thunks";
import { ICart } from "./interfcaces/interfaces";
import { setMessageAC } from "./actions/actions";

const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/about/About"));
const Profile = React.lazy(() => import("./components/profile/Profile"));
const Products = React.lazy(() => import("./components/products/Products"));
const Cart = React.lazy(() => import("./components/cart/Cart"));

interface AppProps {
  nothing: boolean;
}
interface AppState {
  hasError: boolean;
}

const App = React.memo(() => {
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);
  const cartGames = useSelector<AppRootState, ICart[]>((state) => state.cartGames);
  const dispatch = useDispatch();

  const total = useMemo(() => cartGames.reduce((acc, curr) => acc + curr.price * Number(curr.amount), 0), [cartGames]);

  useEffect(() => {
    const login = localStorage.getItem("signInLoginValue");
    login && dispatch(fetchCartThunkCreator(login, total));
    if(cartGames.length === 0){
      dispatch(setMessageAC("Your cart is empty"));
     } else{
      dispatch(setMessageAC(""))
     }
  }, []);

  return (
    <div>
      <HeaderContainer />

      <div className={mainStyle.container}>
        <React.Suspense fallback={<Preloader className="" />}>
          <Switch>
            <Route path={path.home} render={(routeProps: RouteComponentProps) => <Home {...routeProps} />} />
            <ProtectedRoute path={path.products}>
              <Products />
            </ProtectedRoute>
            <ProtectedRoute path={path.about}>
              <About />
            </ProtectedRoute>
            <Route path={path.profile} render={() => <Profile isSignedIn={isSignedIn} />} />
            <ProtectedRoute path={path.cart}>
              <Cart total={total}/>
            </ProtectedRoute>
            <Redirect from="*" to={path.home} />
            <Redirect to={path.profile} />
          </Switch>
        </React.Suspense>
      </div>

      <Footer />
    </div>
  );
});

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    alert("error occured ");
    console.error();
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      <Redirect to={path.home} />;
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
