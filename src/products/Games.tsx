// eslint-disable-next-line no-use-before-define
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "@/app/storetype";
import { GameType } from "@/types/types";
import Game from "./game";
import homeStyles from "../components/home/home.module.css";
import main from "../styles/main.module.css";

interface GamesPropsType {
  updateGame: (updatedGame: GameType) => void;
}

const Games = React.memo((props: GamesPropsType): JSX.Element => {
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.sortedGames);
  const backError = useSelector<AppRootState, string>((state) => state.systemMessages.error);

  const updateGame = useCallback(
    (updatedGame: GameType) => {
      props.updateGame(updatedGame);
    },
    [props.updateGame]
  );

  return (
    <div className={homeStyles.gamesContainer}>
      {games.map((g) => (
        <Game key={g.id} game={g} updateGame={updateGame} />
      ))}
      {backError && <div className={main.error}>{backError}</div>}
    </div>
  );
});

export default Games;
