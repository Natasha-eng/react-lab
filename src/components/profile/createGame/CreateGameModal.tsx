import { AppRootState } from "@/app/storetype";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputText from "@/elements/input/InputText";
import { age } from "backend/src/constants/constants";
import { GameType } from "@/types/types";
import { convertToBase64 } from "@/utils/util";
import { createGameThunkCreator } from "@/thunks/thunks";
import { commonError, gameCreatedMessge, gameGenre, gamePlatform } from "@/constants/constants";
import modalStyle from "../../modal/modal.module.css";
import main from "../../../styles/main.module.css";
import profileStyle from "../profile.module.css";
import productsStyle from "../../../products/products.module.css";
import gamePhoto from "../../../assets/images/bd3f28084f579a8b2391d49f5a9dc570.jpg";
import gameModalStyle from "../updateGame/createGameModal.module.css";

interface ICreateGameModal {
  toggleModal: () => void;
  createGameHandler: (updatedGame: GameType) => void;
}

export default function CreateGameModal(props: ICreateGameModal) {
  const dispatch = useDispatch();
  const [error, setError] = useState({ error: "" });
  const [message, setMessage] = useState("");
  const [allowedAge, setAllowedAge] = useState("");
  const [platform, setPlatform] = useState("");
  const [photoFile, setPhotoFile] = useState<string>(gamePhoto);
  const [gameName, setGameName] = useState("");
  const [genre, setGenre] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const backError = useSelector<AppRootState, string>((state) => state.auth.error);

  const changeAllowedAgeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setAllowedAge(e.target.value);
  };

  const changeGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  const changeGamePlatform = (e: MouseEvent<HTMLInputElement>) => {
    setPlatform(e.currentTarget.value);
  };

  const onBlurHandler = () => {
    if (!gameName && !platform && !genre && !gamePrice && !gameDescription) {
      setError({ error: commonError });
    } else {
      setError({ error: "" });
    }
  };

  const changeGameNameHandler = (value: string) => {
    setGameName(value);
  };

  const changeGamePriceHandler = (value: string) => {
    setGamePrice(value);
  };
  const changeGameDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setGameDescription(e.target.value);
  };

  const onPhotoSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const base64: string = (await convertToBase64(file)) as string;
      setPhotoFile(base64);
      changeImageValueHandler(base64);
    }
  };

  const changeImageValueHandler = (value: string) => {
    setPhotoFile(value);
  };

  const createGameHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!gameName && !platform && !genre && !gamePrice && !gameDescription) {
      setError({ error: commonError });
    } else {
      const updatedGame = {
        id: 0,
        name: gameName,
        price: +gamePrice,
        description: gameDescription,
        allowedAge,
        data: "",
        img: photoFile,
        category: platform,
        genre,
      };
      props.createGameHandler(updatedGame);
      dispatch(createGameThunkCreator(updatedGame));
      setError({ error: "" });
      setMessage(gameCreatedMessge);
    }
  };

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
              <img src={photoFile || gamePhoto} alt="MainPhoto" />

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
                error={error.error}
              />

              <InputText
                name="price"
                type="number"
                label="Price"
                value={gamePrice}
                onChangeValueHandler={changeGamePriceHandler}
                onBlurHander={onBlurHandler}
                error={error.error}
              />

              <InputText
                name="image"
                type="text"
                label="Image"
                value={photoFile}
                onChangeValueHandler={changeImageValueHandler}
                onBlurHander={onBlurHandler}
                error={error.error}
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
                    onBlur={onBlurHandler}
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
                  <option value={age.age3}>3+</option>
                  <option value={age.age6}>6+</option>
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
                      value={gamePlatform.pc}
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
              {error.error && <div className={main.error}>{error.error}</div>}
              {message && <p className={modalStyle.message}>{message}</p>}

              <button type="submit" onClick={createGameHandler}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
