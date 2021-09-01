import { useState } from "react";
import { NavLink } from "react-router-dom";
import headerStyle from "./header.module.css";

export const path = {
  home: "/home",
  products: "/products",
  about: "/about",
};

function Header(): JSX.Element {
  const [clicked, setClicked] = useState<boolean>(false);

  const slide = `${headerStyle.subMenu} ${clicked ? headerStyle.SlideSideBar : headerStyle.CloseSlideSideBar}`;

  const clickHandler = () => {
    setClicked(!clicked);
  };

  return (
    <header className={headerStyle.header}>
      <h1>Best Games Market</h1>
      <ul className={headerStyle.navBar}>
        <li className={headerStyle.navItem}>
          <NavLink to={path.home} activeClassName={headerStyle.activeLink}>
            Home
          </NavLink>
        </li>
        <div>
          <li className={headerStyle.navItem}>
            <NavLink to="/products" activeClassName={headerStyle.activeLink} onClick={clickHandler}>
              Products
            </NavLink>
          </li>
          <div className={slide}>
            <NavLink to="/products/pc" className={headerStyle.subItem}>
              PC
            </NavLink>

            <NavLink to="/products/playstation" className={headerStyle.subItem}>
              Playstation
            </NavLink>

            <NavLink to="/products/xbox" className={headerStyle.subItem}>
              Xbox
            </NavLink>
          </div>
        </div>
        <li className={headerStyle.navItem}>
          <NavLink to={path.about} activeClassName={headerStyle.activeLink}>
            About
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
