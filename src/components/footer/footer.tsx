// eslint-disable-next-line no-use-before-define
import React from "react";
import { faApple, faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import footerStyle from "./footer.module.css";

const Footer = React.memo(
  (): JSX.Element => (
    <footer className={footerStyle.footer}>
      <a href="https://www.xbox.com/ru-RU/?xr=mebarnav" target="_blank" rel="noreferrer">
        <i>
          <FontAwesomeIcon icon={faXbox} />
        </i>
      </a>
      <a href="https://apps.apple.com/ru/genre/ios-%D0%B8%D0%B3%D1%80%D1%8B/id6014" target="_blank" rel="noreferrer">
        <i>
          <FontAwesomeIcon icon={faApple} />
        </i>
      </a>
      <a href="https://www.sie.com/en/index.html" target="_blank" rel="noreferrer">
        <i>
          <FontAwesomeIcon icon={faPlaystation} />
        </i>
      </a>
      <a href="https://theninehertz.com/" target="_blank" rel="noreferrer">
        <i>
          <FontAwesomeIcon icon={faGamepad} />
        </i>
      </a>
    </footer>
  )
);

export default Footer;
