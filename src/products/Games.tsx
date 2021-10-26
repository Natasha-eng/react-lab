import { useSelector } from "react-redux";
import { AppRootState } from "@/app/storetype";
import { GameType } from "@/types/types";
import Game from "./game";
import homeStyles from "../components/home/home.module.css";
import main from "../styles/main.module.css";

interface GamesPropsType {
  updateGame: (updatedGame: GameType) => void;
}

export default function Games(props: GamesPropsType): JSX.Element {
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.sortedGames);
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);

  const updateGame = (updatedGame: GameType) => {
    props.updateGame(updatedGame);
  };

  return (
    <div className={homeStyles.gamesContainer}>
      {games.map((g) => (
        <Game key={g.id} game={g} updateGame={updateGame} />
      ))}
      {backError && <div className={main.error}>{backError}</div>}
    </div>
  );
}
