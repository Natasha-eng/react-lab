import { setMessageAC, updateGameAC } from "@/actions/actions";
import { AppRootState } from "@/app/storetype";
import UpdateGameModalContainer from "@/components/profile/updateGame/UpdateGameModalContainer";
import { addGameThunkCreator, fetchGameThunkCreator } from "@/thunks/thunks";
import { GameType } from "@/types/types";
import useLoader from "@/useLoader/useLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gameStyle from "./game.module.css";

interface GamePropsType {
  game: GameType;
  updateGame: (updatedGame: GameType) => void;
}

function Game(props: GamePropsType): JSX.Element {
  const isAdmin = useSelector<AppRootState, boolean>((state) => state.profile.profile.isAdmin);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  const addGameHandler = () => {
    const login = localStorage.getItem("signInLoginValue");
    login && dispatch(addGameThunkCreator(login, props.game.id));
  };

  const toggleModal = () => {
    setIsModal(!isModal);
    dispatch(fetchGameThunkCreator(props.game.id, setLoaderHandler));
    dispatch(setMessageAC(""));
  };

  const updateGameHandler = (updatedGame: GameType) => {
    dispatch(updateGameAC(updatedGame));
    props.updateGame(updatedGame);
  };

  const { setLoaderHandler, ComponentWithLoader } = useLoader(
    <UpdateGameModalContainer toggleModal={toggleModal} updateGameHandler={updateGameHandler} />
  );

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
          {isAdmin && (
            <button type="button" onClick={toggleModal}>
              Edit
            </button>
          )}
        </div>
      </div>
      {/* {isModal && <CreateGameModalContainer toggleModal={toggleModal} updateGameHandler={updateGameHandler} />} */}
      {isModal && ComponentWithLoader}
    </div>
  );
}

export default Game;
