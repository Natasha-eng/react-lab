import { ReactNode, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { path } from "../header/headerWithContext";
import SignInContainer from "../signin/SignInContainer";

interface IProtectedRoute {
  children: ReactNode;
  isSignedIn: boolean;
  path: string;
}

function ProtectedRoute(props: IProtectedRoute) {
  const [modal, setShowModal] = useState(true);

  const toggleSignIn = () => {
    setShowModal(!modal);
  };

  if (!props.isSignedIn && modal) {
    return <SignInContainer toggleSignIn={toggleSignIn} />;
  }
  return (
    <Route
      path={props.path}
      render={(routeProps) => {
        if (props.isSignedIn) {
          return props.children;
        }
        return <Redirect to={{ pathname: path.home, state: { from: routeProps.location } }} />;
      }}
    />
  );
}

export default ProtectedRoute;
