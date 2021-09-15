import { createContext, ReactNode, useState } from "react";

interface IsignInState {
  loginName: string;
  signedIn: boolean;
}

export interface IContext {
  loginName: string;
  signedIn: boolean;
  signInHandler: (signInState: IsignInState) => void;
}

export const SignInContext = createContext<IContext>({
  loginName: "",
  signedIn: false,
  signInHandler: (signInState: IsignInState) => {
    console.error("This function should be overriden", signInState);
  },
});

export default function Context({ children }: { children: ReactNode }): JSX.Element {
  const [signInState, setSignInState] = useState({
    loginName: "",
    signedIn: false,
  });

  return (
    <SignInContext.Provider
      value={{ loginName: signInState.loginName, signedIn: signInState.signedIn, signInHandler: setSignInState }}
    >
      {children}
    </SignInContext.Provider>
  );
}
