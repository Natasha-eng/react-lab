import { AppRootState } from "@/app/storetype";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import SignInContainer from "../signin/SignInContainer";

interface IProtectedRoute {
  children: ReactNode;
  isSignedIn: boolean;
  path: string;
}

export default function ProtectedRoute(props: IProtectedRoute) {
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
        if (props.isSignedIn) {
          return props.children;
        }
        return <Redirect to={{ pathname: "/home", state: { from: routeProps.location } }} />;
      }}
    />
  );
}
