// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react";
import { AppRootState } from "@/app/storetype";
import Game from "app/components/products/game";
import { fetchGamesByDateThunkCreator } from "@/thunks/thunks";
import { GameType } from "app/interfcaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import main from "../../styles/main.module.css";
import headerStyle from "../header/css/header.module.css";
import SearchInput from "../search/SearchInput";
import homeStyles from "./css/home.module.css";
import mainStyle from "../../styles/main.module.css";

const Home = React.memo((props: RouteComponentProps): JSX.Element => {
  const dispatch = useDispatch();
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.games);

  useEffect(() => {
    dispatch(fetchGamesByDateThunkCreator());
  }, []);

  return (
    <div className={main.content}>
      <div className={mainStyle.pageName}>Home page</div>

      <SearchInput />

      <div className={homeStyles.subTitle}>Categories</div>
      <div className={homeStyles.categories}>
        <div className={homeStyles.category}>
          <NavLink to="/products/pc" className={headerStyle.subItem}>
            PC
          </NavLink>
        </div>
        <div className={homeStyles.category}>
          <NavLink to="/products/playstation" className={headerStyle.subItem}>
            Playstation
          </NavLink>
        </div>

        <div className={homeStyles.category}>
          <NavLink to="/products/xbox" className={headerStyle.subItem}>
            XBox
          </NavLink>
        </div>
      </div>
      <div className={homeStyles.subTitle}>New Games</div>
      <div className={homeStyles.gamesContainer}>
        {games.map((g) => (
          <Game key={g.id} game={g} updateGame={() => {}} path={props.location.pathname} />
        ))}
      </div>
    </div>
  );
});

export default Home;
