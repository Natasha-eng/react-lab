// // watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// import { Component, StrictMode } from "react";
// import ReactDom from "react-dom";
// import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import Home from "./components/home/Home";
// import About from "./components/about/About";
// import Products from "./products/Products";
// import Footer from "./components/footer/footer";
// import Header, { path } from "./components/header/header";
// import { store } from "./app/store";

// interface AppProps {
//   nothing: boolean;
// }
// interface AppState {
//   hasError: boolean;
// }

// function App() {
//   return (
//     <>
//       <Header />
//       <div>
//         <Switch>
//           <Route path={path.home} render={() => <Home />} />
//           <Route path="/products/:category" render={() => <Products />} />
//           <Route path={path.about} render={() => <About />} />
//           <Redirect from="*" to="/home" />
//         </Switch>
//       </div>
//       <Footer />
//     </>
//   );
// }

// class AppContainer extends Component<AppProps, AppState> {
//   ["constructor"]: typeof AppContainer;

//   constructor(props: AppProps) {
//     super(props);
//     this.state = {
//       hasError: false,
//     };
//   }

//   componentDidCatch() {
//     console.log("componentDidCatch");
//     alert("error occured ");
//     console.error();
//     this.setState({ hasError: true });
//   }

//   render() {
//     if (this.state.hasError) {
//       <Redirect to="/home" />;
//     }
//     return (
//       <StrictMode>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </StrictMode>
//     );
//   }
// }

// ReactDom.render(
//   <Provider store={store}>
//     <AppContainer nothing={false} />
//   </Provider>,
//   document.getElementById("app")
// );
