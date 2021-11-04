// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useState } from "react";
import { AppRootState } from "@/app/storetype";
import Game from "@/products/game";
import { fetchGamesByDateThunkCreator } from "@/thunks/thunks";
import { GameType } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import main from "../../styles/main.module.css";
import headerStyle from "../header/header.module.css";
import SearchInput from "../search/SearchInput";
import homeStyles from "./home.module.css";

const Home = React.memo((props: RouteComponentProps): JSX.Element => {
  const [updatedGame, setUpdatedGame] = useState({
    id: 0,
    name: "",
    price: 0,
    description: "",
    allowedAge: "",
    data: "",
    img: "",
    category: "",
    genre: "",
  });
  const dispatch = useDispatch();
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.games);

  const updateGame = useCallback((updatedGame: GameType) => {
    setUpdatedGame(updatedGame);
  }, []);

  useEffect(() => {
    dispatch(fetchGamesByDateThunkCreator());
  }, []);

  useEffect(() => {
    dispatch(fetchGamesByDateThunkCreator());
  }, [games]);

  return (
    <div className={main.content}>
      <div>Home page</div>

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
          <Game key={g.id} game={g} updateGame={updateGame} />
        ))}
      </div>
    </div>
  );
});

export default Home;
