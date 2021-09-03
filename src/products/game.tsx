import { GameType } from "@/types/types";
import main from "../styles/main.module.css";

interface GamePropsType {
  game: GameType;
}

function Game(props: GamePropsType): JSX.Element {
  return (
    <div className={main.gameContainer} key={props.game.id}>
      <div>game page</div>
      <img src={props.game.img} alt="computer games" />
      <div>{props.game.name}</div>
      <div>{props.game.price}</div>
      <div>{props.game.category}</div>
    </div>
  );
}

export default Game;
