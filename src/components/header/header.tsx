import { setIsSignedInAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import SignInContainer from "../signin/SignInContainer";
import SignUpContainer from "../signup/SignUpContainer";
import headerStyle from "./header.module.css";

export const path = {
  home: "/home",
  products: "/products",
  about: "/about",
  profile: "/profile",
};

interface IHome {
  isSignedIn: boolean;
}

function Header(props: IHome): JSX.Element {
  const [clicked, setClicked] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector<AppRootState, string>((state) => state.profile.userName);

  const slide = `${headerStyle.subMenu} ${clicked ? headerStyle.SlideSideBar : headerStyle.CloseSlideSideBar}`;

  const clickHandler = () => {
    setClicked(!clicked);
  };

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  const signOutHandler = () => {
    dispatch(setIsSignedInAC(false));
    history.push("/home");
  };

  return (
    <header className={headerStyle.header}>
      <h1 className={headerStyle.title}>Best Games Market</h1>

      <ul className={headerStyle.navBar}>
        <li className={headerStyle.navItem}>
          <NavLink to={path.home} activeClassName={headerStyle.activeLink}>
            Home
          </NavLink>
        </li>

        <li className={headerStyle.navItem}>
          <NavLink to="/products" activeClassName={headerStyle.activeLink} onClick={clickHandler}>
            Products
            <div className={slide}>
              <NavLink to="/pc" className={headerStyle.subItem}>
                PC
              </NavLink>

              <NavLink to="/playstation" className={headerStyle.subItem}>
                Playstation
              </NavLink>

              <NavLink to="/xbox" className={headerStyle.subItem}>
                Xbox
              </NavLink>
            </div>
          </NavLink>
        </li>

        <li className={headerStyle.navItem}>
          <NavLink to={path.about} activeClassName={headerStyle.activeLink}>
            About
          </NavLink>
        </li>
        {props.isSignedIn ? (
          <>
            <li className={headerStyle.navItem}>
              <NavLink to={path.profile} activeClassName={headerStyle.activeLink}>
                {userName}
              </NavLink>
            </li>
            <button type="submit" onClick={signOutHandler}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className={headerStyle.navItem} type="button" onClick={toggleSignIn}>
              Sign In
            </button>
            <button className={headerStyle.navItem} type="button" onClick={toggleSignUp}>
              Sign Up
            </button>
          </>
        )}
      </ul>

      {signIn && <SignInContainer toggleSignIn={toggleSignIn} />}
      {signUp && <SignUpContainer toggleSignUp={toggleSignUp} />}
    </header>
  );
}

export default Header;
