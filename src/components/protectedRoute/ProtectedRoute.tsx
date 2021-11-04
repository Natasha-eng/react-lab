// eslint-disable-next-line no-use-before-define
import React, { ReactNode, useCallback, useState } from "react";
import { AppRootState } from "@/app/storetype";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { path } from "../header/headerWithContext";
import SignInContainer from "../signin/SignInContainer";

interface IProtectedRoute {
  children: ReactNode;
  path: string;
}

const ProtectedRoute = React.memo((props: IProtectedRoute): JSX.Element => {
  const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);
  const [modal, setShowModal] = useState(true);

  const toggleSignIn = useCallback(() => {
    setShowModal(!modal);
  }, [modal]);

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
});

export default ProtectedRoute;
