import { GameType } from "@/types/types";
import main from "../styles/main.module.css";

interface GamePropsType {
  game: GameType;
}

function Game(props: GamePropsType): JSX.Element {
  return (
    <div className={main.container} key={props.game.id}>
      <div>games</div>
      <div>{props.game.name}</div>
      <div>{props.game.price}</div>
    </div>
  );
}

export default Game;
