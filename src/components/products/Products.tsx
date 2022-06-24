// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter, RouteComponentProps } from "react-router-dom";
import { fetchSortedGamesByCategoryThunkCreator, fetchSortedGamesThunkCreator } from "@/thunks/thunks";
import SearchInput from "@/components/search/SearchInput";
import useLoader from "@/useLoader/useLoader";
import { age, criteria, genre } from "@/constants/constants";
import { AppRootState } from "@/app/storetype";
import { GameType } from "app/interfcaces/interfaces";
import CreateGameModalContainer from "app/components/gameModals/createGame/CreateGameModalContainer";
import main from "../../styles/main.module.css";
import productsStyle from "./css/products.module.css";
import mainStyle from "../../styles/main.module.css";
import Games from "./Games";
import searchInputStyles from "../search/css/searchInput.module.css";
import { ageData, genresData } from "./data";

type CategoryParams = {
  category: string;
};

const Products = React.memo((props: RouteComponentProps): JSX.Element => {
  const dispatch = useDispatch();
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.sortedGames);
  const isAdmin = useSelector<AppRootState, boolean>((state) => state.profile.profile.isAdmin);
  const [selectedAge, setSelectedAge] = useState<string>(age.all);
  const [selectedGenre, setSelectedGenre] = useState<string>(genre.all);
  const [sortCriteria, setSortCriteria] = useState<string>(criteria.name);
  const [sortType, setSortType] = useState<string>(criteria.ascending);
  const [isModal, setIsModal] = useState(false);
  const [updatedGame, setUpdatedGame] = useState<GameType>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    allowedAge: "",
    date: "",
    img: "",
    category: "",
    genre: "",
  });

  const { category } = useParams<CategoryParams>();

  const openModalHandler = useCallback(() => {
    setIsModal(true);
  }, []);

  const updateGame = useCallback((gameUpdated: GameType) => {
    setUpdatedGame(gameUpdated);
  }, []);

  const { setLoaderHandler, ComponentWithLoader } = useLoader(
    <Games updateGame={updateGame} path={props.location.pathname} />
  );

  const toggleModal = useCallback(() => {
    setIsModal(!isModal);
  }, [isModal]);

  const getGamesByAgeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedAge(e.target.value);
  }, []);

  const getGamesByGenreHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedGenre(e.target.value);
  }, []);

  const changeSortCriteriaHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortCriteria(e.target.value);
  }, []);

  const changeSortTypeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortType(e.target.value);
  }, []);

  useEffect(() => {
    if (category) {
      dispatch(
        fetchSortedGamesByCategoryThunkCreator(
          selectedAge,
          selectedGenre,
          sortCriteria,
          sortType,
          category,
          setLoaderHandler
        )
      );
    } else {
      dispatch(fetchSortedGamesThunkCreator(selectedAge, selectedGenre, sortCriteria, sortType, setLoaderHandler));
    }
  }, [category, selectedAge, selectedGenre, sortCriteria, sortType, updatedGame]);

  return (
    <div className={main.content}>
      <div className={mainStyle.pageName}>Products page</div>
      <div className={searchInputStyles.inputContainer}>
        <SearchInput />
        {isAdmin && (
          <button className={searchInputStyles.createGameButton} type="button" onClick={openModalHandler}>
            Create Game
          </button>
        )}
      </div>
      <div className={productsStyle.contentWrapper}>
        <div className={productsStyle.sortWrapper}>
          <h3> Sort</h3>
          <form className={productsStyle.sortItems}>
            <label htmlFor="gamesCriteria" className={productsStyle.sortForm}>
              Criteria
              <select id="gamesCriteria" name="gamesCriteria" value={sortCriteria} onChange={changeSortCriteriaHandler}>
                <option value={criteria.name}>Name</option>
                <option value={criteria.price}>Price</option>
              </select>
            </label>
            <label htmlFor="gamesType" className={productsStyle.sortForm}>
              Type
              <select id="gamesType" name="gamesType" value={sortType} onChange={changeSortTypeHandler}>
                <option value={criteria.ascending}>Ascending</option>
                <option value={criteria.descending}>Descending</option>
              </select>
            </label>
            <h3>Genres</h3>

            {genresData.map((d) => (
              <div key={d.label} className={productsStyle.formItem}>
                <label htmlFor={d.htmlFor}>
                  <input
                    type="radio"
                    id={d.htmlFor}
                    name={d.htmlFor}
                    value={d.value}
                    checked={selectedGenre === d.value}
                    onChange={getGamesByGenreHandler}
                  />
                  {d.label}
                </label>
              </div>
            ))}

            <h3>Age</h3>

            {ageData.map((a) => (
              <div key={a.label} className={productsStyle.formItem}>
                <label htmlFor={a.value}>
                  <input
                    type="radio"
                    id={a.value}
                    name={a.value}
                    value={a.value}
                    checked={selectedAge === a.value}
                    onChange={getGamesByAgeHandler}
                  />
                  {a.label}
                </label>
              </div>
            ))}
          </form>
        </div>
        {ComponentWithLoader}
      </div>
      {isModal && <CreateGameModalContainer toggleModal={toggleModal} createGameHandler={updateGame} />}
    </div>
  );
});

export default withRouter(Products);
