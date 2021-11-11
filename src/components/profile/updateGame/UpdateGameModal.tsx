// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { AppRootState } from "@/app/storetype";
import { useDispatch, useSelector } from "react-redux";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "@/elements/input/InputText";
import { age } from "backend/src/constants/constants";
import { GameType } from "@/types/types";
import { convertToBase64 } from "@/utils/util";
import { deleteGameThunkCreator, updateGameThunkCreator } from "@/thunks/thunks";
import { setMessageAC } from "@/actions/actions";
import { commonError, gameGenre, gamePlatform, gameUpdatedMessage } from "@/constants/constants";
import modalStyle from "../../modal/modal.module.css";
import main from "../../../styles/main.module.css";
import profileStyle from "../profile.module.css";
import productsStyle from "../../../products/products.module.css";
import userPhoto from "../../../assets/images/avatar_square_blue_120dp.png";
import gameModalStyle from "./createGameModal.module.css";
import DeleteGameModal from "../deleteGaemModal/DeleteGameModal";

interface ICreateGameModal {
  toggleModal: () => void;
  updateGameHandler: (updatedGame: GameType) => void;
}

const UpdateGameModal = React.memo((props: ICreateGameModal): JSX.Element => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const game = useSelector<AppRootState, GameType>((state) => state.game);
  const message = useSelector<AppRootState, string>((state) => state.systemMessages.message);
  const [allowedAge, setAllowedAge] = useState(game.allowedAge);
  const [platform, setPlatform] = useState(game.category);
  const [photoFile, setPhotoFile] = useState<string>(game.img);
  const [gameName, setGameName] = useState(game.name);
  const [genre, setGenre] = useState(game.genre);
  const [gamePrice, setGamePrice] = useState(game.price.toString());
  const [gameDescription, setGameDescription] = useState(game.description);
  const backError = useSelector<AppRootState, string>((state) => state.systemMessages.error);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setPhotoFile(game.img);
    setAllowedAge(game.allowedAge);
    setPlatform(game.category);
    setGameName(game.name);
    setGenre(game.genre);
    setGamePrice(game.price.toString());
    setGameDescription(game.description);
  }, [game.img, game.allowedAge, game.category, game.name, game.genre, game.price, game.description]);

  const changeAllowedAgeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAllowedAge(e.target.value);
  }, []);

  const changeGamePlatform = useCallback((e: MouseEvent<HTMLInputElement>) => {
    setPlatform(e.currentTarget.name);
  }, []);

  const onBlurHandler = useCallback(() => {
    if (!gameName || !platform || !genre || !gamePrice || !gameDescription) {
      setError(commonError);
    } else {
      setError("");
    }
  }, [gameName, platform, genre, gamePrice, gameDescription]);

  const changeGameNameHandler = useCallback((value: string) => {
    setGameName(value);
  }, []);

  const changeGenre = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setGenre(e.target.value);
  }, []);

  const changeGamePriceHandler = useCallback((value: string) => {
    setGamePrice(value);
  }, []);

  const changeGameDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setGameDescription(e.target.value);
  }, []);

  const changeImageValueHandler = useCallback((value: string) => {
    setPhotoFile(value);
  }, []);

  const onPhotoSelected = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const base64: string = (await convertToBase64(file)) as string;
      setPhotoFile(base64);
      changeImageValueHandler(base64);
    }
  }, []);

  const updateGameHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!gameName || !platform || !genre || !gamePrice || !gameDescription) {
        setError(commonError);
      } else {
        const updatedGame = {
          id: game.id,
          name: gameName,
          price: +gamePrice,
          description: gameDescription,
          allowedAge,
          data: "",
          img: photoFile,
          category: platform,
          genre,
        };
        props.updateGameHandler(updatedGame);
        dispatch(updateGameThunkCreator(updatedGame));
        dispatch(setMessageAC(gameUpdatedMessage));
        setError("");
      }
    },
    [gameName, platform, genre, gamePrice, gameDescription, photoFile, game.id, dispatch, props.updateGameHandler]
  );

  const deleteGameHandler = useCallback(() => {
    const updatedGame = {
      id: game.id,
      name: gameName,
      price: +gamePrice,
      description: gameDescription,
      allowedAge,
      data: "",
      img: photoFile,
      category: platform,
      genre,
    };
    props.updateGameHandler(updatedGame);
    dispatch(deleteGameThunkCreator(updatedGame.id));
  }, [
    dispatch,
    props.updateGameHandler,
    gameName,
    photoFile,
    platform,
    gamePrice,
    gameDescription,
    photoFile,
    game.id,
  ]);

  const openModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  return (
    <>
      <form className={modalStyle.modalBackground}>
        <div className={modalStyle.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyle.modalTitle}>
            <h2>Edit Cart</h2>
            <button type="button" className={modalStyle.closeButton} onClick={props.toggleModal}>
              <i>
                <FontAwesomeIcon icon={faWindowClose} />
              </i>
            </button>
          </div>
          <div className={modalStyle.modalInfoContainer}>
            <div className={profileStyle.mainPhotoWrapper}>
              <img src={photoFile || userPhoto} alt="MainPhoto" />

              <label htmlFor="profileImg" className={profileStyle.changePhotoButton}>
                Change Profile Image
                <input type="file" name="profileImg" id="profileImg" onChange={onPhotoSelected} />
              </label>
            </div>
            <div className={modalStyle.inputsContainer}>
              <InputText
                name="name"
                type="text"
                label="Name"
                value={gameName}
                onChangeValueHandler={changeGameNameHandler}
                onBlurHander={onBlurHandler}
                error={error}
              />

              <InputText
                name="price"
                type="number"
                label="Price"
                value={gamePrice}
                onChangeValueHandler={changeGamePriceHandler}
                onBlurHander={onBlurHandler}
                error={error}
              />

              <InputText
                name="image"
                type="text"
                label="Image"
                value={photoFile}
                onChangeValueHandler={changeImageValueHandler}
                onBlurHander={onBlurHandler}
                error={error}
              />

              <div className={profileStyle.profileTextareaWrapper}>
                <div>
                  <label htmlFor="gameDescription">Profile Description:</label>
                  <textarea
                    value={gameDescription}
                    name="gameDescription"
                    id="gameDescription"
                    rows={4}
                    cols={70}
                    onChange={changeGameDescription}
                  />
                </div>
                <div className={main.error} />
              </div>
              <label htmlFor="gamesCriteria" className={productsStyle.sortForm}>
                Genre
                <select id="gamesGenre" name="gamesGenre" value={genre} onChange={changeGenre}>
                  <option value={gameGenre.arcade}>Arcade</option>
                  <option value={gameGenre.shooter}>Shooter</option>
                  <option value={gameGenre.survive}>Survive</option>
                </select>
              </label>
              <label htmlFor="gamesCriteria" className={productsStyle.sortForm}>
                Age
                <select id="gamesCriteria" name="gamesCriteria" value={allowedAge} onChange={changeAllowedAgeHandler}>
                  <option value={age.age6}>6+</option>
                  <option value={age.age3}>3+</option>
                  <option value={age.age12}>12+</option>
                  <option value={age.age18}>18+</option>
                </select>
              </label>
              <div>
                <h4>Platform</h4>
                <div className={gameModalStyle.checkboxContainer}>
                  <div className={gameModalStyle.checkbox}>
                    <label htmlFor={gamePlatform.pc}>PC</label>
                    <input
                      id={gamePlatform.pc}
                      name={gamePlatform.pc}
                      type="checkbox"
                      checked={gamePlatform.pc === platform}
                      onClick={changeGamePlatform}
                    />
                  </div>

                  <div className={gameModalStyle.checkbox}>
                    <label htmlFor={gamePlatform.playstation}>Playstaion 5</label>
                    <input
                      id={gamePlatform.playstation}
                      value={gamePlatform.playstation}
                      name={gamePlatform.playstation}
                      type="checkbox"
                      checked={gamePlatform.playstation === platform}
                      onClick={changeGamePlatform}
                    />
                  </div>

                  <div className={gameModalStyle.checkbox}>
                    <label htmlFor={gamePlatform.xbox}>Xbox One</label>
                    <input
                      id={gamePlatform.xbox}
                      value={gamePlatform.xbox}
                      name={gamePlatform.xbox}
                      type="checkbox"
                      checked={gamePlatform.xbox === platform}
                      onClick={changeGamePlatform}
                    />
                  </div>
                </div>
              </div>

              {backError && <div className={main.error}>{backError}</div>}

              <button type="submit" onClick={updateGameHandler}>
                Submit
              </button>
              <button type="submit" onClick={openModal}>
                Delete Card
              </button>
            </div>
          </div>
          <p className={modalStyle.message}>{message}</p>
        </div>
        {isModal && (
          <DeleteGameModal closeModal={closeModal} deleteGameHandler={deleteGameHandler} gameName={game.name} />
        )}
      </form>
    </>
  );
});

export default UpdateGameModal;
