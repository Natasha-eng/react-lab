import { setIsSignedInAC } from "@/actions/actions";
import { KeyboardEvent, useState } from "react";
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

interface IHome {
  isSignedIn: boolean;
  userName: string;
}

function Header(props: IHome): JSX.Element {
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const userName = useSelector<AppRootState, string>((state) => state.profile.userName);
  // const isSignedIn = useSelector<AppRootState, boolean>((state) => state.auth.isSignedIn);

  const slide = `${headerStyle.subMenu} ${dropdown ? headerStyle.SlideSideBar : headerStyle.CloseSlideSideBar}`;

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const toggleSignIn = () => {
    if (props.isSignedIn) {
      setSignIn(false);
    }
    setSignIn(!signIn);
  };

  const toggleSignUp = () => {
    if (props.isSignedIn) {
      setSignUp(false);
    }
    setSignUp(!signUp);
  };

  const signOutHandler = () => {
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
        {props.isSignedIn ? (
          <>
            <li className={headerStyle.navItem}>
              <NavLink to={path.profile} activeClassName={headerStyle.activeLink}>
                {props.userName}
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
