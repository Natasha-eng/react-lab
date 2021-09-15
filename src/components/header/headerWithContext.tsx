import { setIsSignedInAC } from "@/actions/actions";
import { SignInContext } from "@/signInContex/SignInContex";
import { KeyboardEvent, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import SignInContainer from "../signin/SignInContainer";
import SignUpContainer from "../signup/SignUpContainer";
import headerStyle from "./header.module.css";

export const path = {
  home: "/home",
  products: "/products/:category?",
  about: "/about",
  profile: "/profile",
};

function HeaderWithContext(): JSX.Element {
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { signedIn, loginName, signInHandler } = useContext(SignInContext);

  const slide = `${headerStyle.subMenu} ${dropdown ? headerStyle.SlideSideBar : headerStyle.CloseSlideSideBar}`;

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleSignIn = () => {
    if (signedIn) {
      setSignIn(false);
    }
    setSignIn(!signIn);
  };

  const toggleSignUp = () => {
    if (signedIn) {
      setSignUp(false);
    }
    setSignUp(!signUp);
  };

  const signOutHandler = () => {
    signInHandler({ signedIn: false, loginName: "" });
    dispatch(setIsSignedInAC(false));
    history.push(path.home);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.code === "Enter") {
      setDropdown(!dropdown);
    }
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

        <li
          className={headerStyle.navItem}
          onMouseLeave={() => setDropdown(false)}
          onMouseEnter={() => setDropdown(true)}
          onClick={toggleDropdown}
          onKeyPress={handleKeyPress}
          role="menuitem"
          tabIndex={0}
        >
          <NavLink to="/products" activeClassName={headerStyle.activeLink} onClick={toggleDropdown}>
            Products
          </NavLink>
          <ul className={slide}>
            <li>
              <NavLink to="/products/pc" className={headerStyle.subItem} onClick={toggleDropdown}>
                PC
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/playstation" className={headerStyle.subItem} onClick={toggleDropdown}>
                Playstation
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/xbox" className={headerStyle.subItem} onClick={toggleDropdown}>
                Xbox
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={headerStyle.navItem}>
          <NavLink to={path.about} activeClassName={headerStyle.activeLink}>
            About
          </NavLink>
        </li>
        {signedIn ? (
          <>
            <li className={headerStyle.navItem}>
              <NavLink to={path.profile} activeClassName={headerStyle.activeLink}>
                {loginName}
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

export default HeaderWithContext;
