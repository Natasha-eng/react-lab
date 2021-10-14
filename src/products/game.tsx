import { addGameThunkCreator } from "@/thunks/thunks";
import { GameType } from "@/types/types";
import { useDispatch } from "react-redux";
import gameStyle from "./game.module.css";

interface GamePropsType {
  game: GameType;
}

function Game(props: GamePropsType): JSX.Element {
  const dispatch = useDispatch();

  const addGameHandler = () => {
    const login = localStorage.getItem("signInLoginValue");
    const cart = {
      gameId: props.game.id,
      count: null,
      orderDate: "",
      price: props.game.price,
    };
    login && dispatch(addGameThunkCreator(login, [cart]));
  };

  return (
    <div className={gameStyle.gameContainer} key={props.game.id}>
      <div className={gameStyle.flipCardFront}>
        <div className={gameStyle.inner}>
          <div>game page</div>
          <img src={props.game.img} alt="computer games" />
          <h3>{props.game.name}</h3>
          <div>{props.game.price}</div>
          <div>{props.game.category}</div>
          <div>{props.game.genre}</div>
        </div>
      </div>

      <div className={gameStyle.flipCardBack}>
        <div className={gameStyle.inner}>
          <p>{props.game.description}</p>
          <p>{props.game.allowedAge}</p>
          <button type="button" onClick={addGameHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;
