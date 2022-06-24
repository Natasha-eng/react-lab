// eslint-disable-next-line no-use-before-define
import React, { useCallback, useState } from "react";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { FaHome, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { CgGames } from "react-icons/cg";
import { ICart } from "backend/src/types/types";
import { AppRootState } from "../../app/storetype";
import { path } from "../../constants/constants";
import { setIsSignedInAC } from "../../actions/actions";
import SignInContainer from "../signin/SignInContainer";
import SignUpContainer from "../signup/SignUpContainer";
import headerStyle from "./css/header.module.css";

interface IHome {
  isSignedIn: boolean;
  userName: string;
}

const Header = React.memo((props: IHome): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);
  const [click, setClick] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const cartGames = useSelector<AppRootState, ICart[]>((state) => state.cartGames);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const toggleDropdown = useCallback(() => {
    setDropdown(!dropdown);
  }, [dropdown]);

  const toggleSignIn = useCallback(() => {
    if (props.isSignedIn) {
      setSignIn(false);
    }
    setSignIn(!signIn);
  }, [props.isSignedIn, signIn]);

  const toggleSignUp = useCallback(() => {
    if (props.isSignedIn) {
      setSignUp(false);
    }
    setSignUp(!signUp);
  }, [props.isSignedIn, signUp]);

  const signOutHandler = useCallback(() => {
    dispatch(setIsSignedInAC(false));
    history.push(path.home);
  }, [dispatch, history]);

  return (
    <header className={headerStyle.header}>
      <h1 className={headerStyle.title}>Best Games Market</h1>
      <div className={headerStyle.manuIcon} onClick={handleClick}>
        {click ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>

      <ul className={click ? `${headerStyle.navBar} ${headerStyle.navbarActive}` : headerStyle.navBar}>
        <li className={headerStyle.navItem}>
          <NavLink to={path.home} activeClassName={headerStyle.activeLink} onClick={closeMobileMenu}>
            <FaHome />
            <span> Home</span>
          </NavLink>
        </li>

        <li
          className={headerStyle.navItem}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          onClick={toggleDropdown}
          role="menuitem"
          tabIndex={0}
        >
          <NavLink to="/products" activeClassName={headerStyle.activeLink} onClick={closeMobileMenu}>
            <CgGames /> Products
          </NavLink>
          {dropdown && <Dropdown />}
        </li>

        {props.isSignedIn ? (
          <li className={headerStyle.navItem}>
            <NavLink to={path.cart} activeClassName={headerStyle.activeLink} onClick={closeMobileMenu}>
              {cartGames.length > 0 && cartGames.reduce((acc, el) => acc + el.amount, 0)} Cart
            </NavLink>
          </li>
        ) : null}

        <li className={headerStyle.navItem}>
          <NavLink to={path.about} activeClassName={headerStyle.activeLink} onClick={closeMobileMenu}>
            <FaInfoCircle /> About
          </NavLink>
        </li>
        {props.isSignedIn ? (
          <>
            <li className={headerStyle.navItem}>
              <NavLink
                to={`/profile/${props.userName}`}
                activeClassName={headerStyle.activeLink}
                onClick={closeMobileMenu}
              >
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
            <button
              className={`${headerStyle.navItem} ${headerStyle.authorizeButton}`}
              type="button"
              onClick={toggleSignIn}
            >
              Sign In
            </button>
            <button
              className={`${headerStyle.navItem} ${headerStyle.authorizeButton}`}
              type="button"
              onClick={toggleSignUp}
            >
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
