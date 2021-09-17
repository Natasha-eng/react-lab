import { AppRootState } from "@/app/storetype";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { path } from "../header/headerWithContext";
import SignInContainer from "../signin/SignInContainer";

interface IProtectedRoute {
  children: ReactNode;
  path: string;
}

function ProtectedRoute(props: IProtectedRoute): JSX.Element {
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);
  const [modal, setShowModal] = useState(true);

  const toggleSignIn = () => {
    setShowModal(!modal);
  };

  if (!isSignedIn && modal) {
    return <SignInContainer toggleSignIn={toggleSignIn} />;
  }
  return (
    <Route
      path={props.path}
      render={(routeProps) => {
        if (isSignedIn) {
          return props.children;
        }
        return <Redirect to={{ pathname: path.home, state: { from: routeProps.location } }} />;
      }}
    />
  );
}

export default ProtectedRoute;
