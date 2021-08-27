import { NavLink } from "react-router-dom";
import headerStyle from "./header.module.css";

export const path = {
  home: "/home",
  products: "/products",
  about: "/about",
};

function Header(): JSX.Element {
  return (
    <header className={headerStyle.header}>
      <h1>Best Games Market</h1>
      <ul className={headerStyle.navBar}>
        <li className={headerStyle.navItem}>
          <NavLink to={path.home} activeClassName={headerStyle.activeLink}>
            Home
          </NavLink>
        </li>
        <li className={headerStyle.navItem}>
          <NavLink to={path.products} activeClassName={headerStyle.activeLink}>
            Products
          </NavLink>
        </li>
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
