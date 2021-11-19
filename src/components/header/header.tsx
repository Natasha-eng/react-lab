// eslint-disable-next-line no-use-before-define
import React, { KeyboardEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { FaHome, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { CgGames } from "react-icons/cg";
import { ICart } from "backend/src/types/types";
import { AppRootState } from "../../app/storetype";
import { path } from "../../constants/constants";
import { setIsSignedInAC } from "../../actions/actions";
import SignInContainer from "../signin/SignInContainer";
import SignUpContainer from "../signup/SignUpContainer";
import headerStyle from "./header.module.css";

interface IHome {
  isSignedIn: boolean;
  userName: string;
}

const Header = React.memo((props: IHome): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const cartGames = useSelector<AppRootState, ICart[]>((state) => state.cartGames);

  const slide = `${headerStyle.subMenu} ${dropdown ? headerStyle.SlideSideBar : headerStyle.CloseSlideSideBar}`;

  const toggleDropdown = useCallback(() => {
    setDropdown(!dropdown);
  }, [dropdown]);

  const toggleSignIn = useCallback(() => {
    if (props.isSignedIn) {
      setSignIn(false);
    }
    setSignIn(!signIn);
  }, [props.isSignedIn]);

  const toggleSignUp = useCallback(() => {
    if (props.isSignedIn) {
      setSignUp(false);
    }
    setSignUp(!signUp);
  }, [props.isSignedIn]);

  const signOutHandler = useCallback(() => {
    dispatch(setIsSignedInAC(false));
    history.push(path.home);
  }, [dispatch]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLLIElement>) => {
      if (e.code === "Enter") {
        setDropdown(!dropdown);
      }
    },
    [dropdown]
  );

  return (
    <header className={headerStyle.header}>
      <h1 className={headerStyle.title}>Best Games Market</h1>

      <ul className={headerStyle.navBar}>
        <li className={headerStyle.navItem}>
          <NavLink to={path.home} activeClassName={headerStyle.activeLink}>
            <FaHome />
            <span> Home</span>
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
            <CgGames /> Products
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

        {props.isSignedIn ? (
          <li className={headerStyle.navItem}>
            <NavLink to={path.cart} activeClassName={headerStyle.activeLink}>
              {cartGames.length} Cart
            </NavLink>
          </li>
        ) : null}

        <li className={headerStyle.navItem}>
          <NavLink to={path.about} activeClassName={headerStyle.activeLink}>
            <FaInfoCircle /> About
          </NavLink>
        </li>
        {props.isSignedIn ? (
          <>
            <li className={headerStyle.navItem}>
              <NavLink to={`profile/${props.userName}`} activeClassName={headerStyle.activeLink}>
                <ImProfile />
                {props.userName}
              </NavLink>
            </li>
            <button type="submit" onClick={signOutHandler}>
              <FaSignOutAlt />
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
});

export default Header;
