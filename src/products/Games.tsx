import { useSelector } from "react-redux";
import { AppRootState } from "@/app/storetype";
import { GameType } from "@/types/types";
import Game from "./game";
import homeStyles from "../components/home/home.module.css";
import main from "../styles/main.module.css";

export default function Games(): JSX.Element {
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.sortedGames);
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);
  return (
    <div className={homeStyles.gamesContainer}>
      {games.map((g) => (
        <Game key={g.id} game={g} />
      ))}
      {backError && <div className={main.error}>{backError}</div>}
    </div>
  );
}
