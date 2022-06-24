import { useState } from "react";
import { NavLink } from "react-router-dom";
import dropdownStyle from "./css/dropdown.module.css";
import { MenuItems } from "./MenuItems";

export default function Dropdown() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        className={click ? dropdownStyle.subMenu && dropdownStyle.clicked : dropdownStyle.subMenu}
        onClick={handleClick}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink to={item.path} className={item.cName} onClick={() => setClick(false)}>
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
