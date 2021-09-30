import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchSortedGamesByCategoryThunkCreator, fetchSortedGamesThunkCreator } from "@/thunks/thunks";
import SearchInput from "@/components/search/SearchInput";
import useLoader from "@/useLoader/useLoader";
import { values } from "@/constants/constants";
import main from "../styles/main.module.css";
import productsStyle from "./products.module.css";
import Games from "./Games";

type CategoryParams = {
  category: string;
};

function Products(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedAge, setSelectedAge] = useState(values.all);
  const [selectedGenre, setSelectedGenre] = useState(values.all);
  const [sortCriteria, setSortCriteria] = useState(values.name);
  const [sortType, setSortType] = useState(values.ascending);

  const { category } = useParams<CategoryParams>();

  const { setLoaderHandler, ComponentWithLoader } = useLoader(<Games />);

  const getGamesByAgeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedAge(e.target.value);
  };

  const getGamesByGenreHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedGenre(e.target.value);
  };

  const changeSortCriteriaHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortCriteria(e.target.value);
  };

  const changeSortTypeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortType(e.target.value);
  };

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
  }, [category, selectedAge, selectedGenre, sortCriteria, sortType]);

  return (
    <div className={main.content}>
      <div>Products page</div>
      <SearchInput />
      <div className={productsStyle.contentWrapper}>
        <div className={productsStyle.sortWrapper}>
          <h3> Sort</h3>
          <form className={productsStyle.sortItems}>
            <label htmlFor="gamesCriteria" className={productsStyle.sortForm}>
              Criteria
              <select id="gamesCriteria" name="gamesCriteria" value={sortCriteria} onChange={changeSortCriteriaHandler}>
                <option value={values.name}>Name</option>
                <option value={values.price}>Price</option>
              </select>
            </label>

            <label htmlFor="gamesType" className={productsStyle.sortForm}>
              Type
              <select id="gamesType" name="gamesType" value={sortType} onChange={changeSortTypeHandler}>
                <option value={values.ascending}>Ascending</option>
                <option value={values.descending}>Descending</option>
              </select>
            </label>

            <h3>Genres</h3>

            <div className={productsStyle.formItem}>
              <label htmlFor={values.allGenres}>
                <input
                  type="radio"
                  id={values.allGenres}
                  name={values.allGenres}
                  value={values.all}
                  checked={selectedGenre === values.all}
                  onChange={getGamesByGenreHandler}
                />
                All Genres
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.shooter}>
                <input
                  type="radio"
                  id={values.shooter}
                  name={values.shooter}
                  value={values.shooter}
                  checked={selectedGenre === values.shooter}
                  onChange={getGamesByGenreHandler}
                />
                Shooter
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.arcade}>
                <input
                  type="radio"
                  id={values.arcade}
                  name={values.arcade}
                  value={values.arcade}
                  checked={selectedGenre === values.arcade}
                  onChange={getGamesByGenreHandler}
                />
                Arcade
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.survive}>
                <input
                  type="radio"
                  id={values.survive}
                  name={values.survive}
                  value={values.survive}
                  checked={selectedGenre === values.survive}
                  onChange={getGamesByGenreHandler}
                />
                Survive
              </label>
            </div>

            <h3>Age</h3>

            <div className={productsStyle.formItem}>
              <label htmlFor={values.all}>
                <input
                  type="radio"
                  id={values.all}
                  name={values.all}
                  value={values.all}
                  checked={selectedAge === values.all}
                  onChange={getGamesByAgeHandler}
                />
                All Ages
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.age3}>
                <input
                  type="radio"
                  id={values.age3}
                  name={values.age3}
                  value={values.age3}
                  checked={selectedAge === values.age3}
                  onChange={getGamesByAgeHandler}
                />
                3+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.age6}>
                <input
                  type="radio"
                  id={values.age6}
                  name={values.age6}
                  value={values.age6}
                  checked={selectedAge === values.age6}
                  onChange={getGamesByAgeHandler}
                />
                6+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.age12}>
                <input
                  type="radio"
                  id={values.age12}
                  name={values.age12}
                  value={values.age12}
                  checked={selectedAge === values.age12}
                  onChange={getGamesByAgeHandler}
                />
                12+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={values.age18}>
                <input
                  type="radio"
                  id={values.age18}
                  name={values.age18}
                  value={values.age18}
                  checked={selectedAge === values.age18}
                  onChange={getGamesByAgeHandler}
                />
                18+
              </label>
            </div>
          </form>
        </div>
        {ComponentWithLoader}
      </div>
    </div>
  );
}

export default withRouter(Products);
