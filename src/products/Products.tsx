import { useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchSortedGamesByCategoryThunkCreator, fetchSortedGamesThunkCreator } from "@/thunks/thunks";
import SearchInput from "@/components/search/SearchInput";
import useLoader from "@/useLoader/useLoader";
import { age, criteria, genre } from "@/constants/constants";
import main from "../styles/main.module.css";
import productsStyle from "./products.module.css";
import Games from "./Games";

type CategoryParams = {
  category: string;
};

function Products(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedAge, setSelectedAge] = useState(age.all);
  const [selectedGenre, setSelectedGenre] = useState(genre.all);
  const [sortCriteria, setSortCriteria] = useState(criteria.name);
  const [sortType, setSortType] = useState(criteria.ascending);

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

            <div className={productsStyle.formItem}>
              <label htmlFor={genre.allGenres}>
                <input
                  type="radio"
                  id={genre.allGenres}
                  name={genre.allGenres}
                  value={genre.all}
                  checked={selectedGenre === genre.all}
                  onChange={getGamesByGenreHandler}
                />
                All Genres
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={genre.shooter}>
                <input
                  type="radio"
                  id={genre.shooter}
                  name={genre.shooter}
                  value={genre.shooter}
                  checked={selectedGenre === genre.shooter}
                  onChange={getGamesByGenreHandler}
                />
                Shooter
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={genre.arcade}>
                <input
                  type="radio"
                  id={genre.arcade}
                  name={genre.arcade}
                  value={genre.arcade}
                  checked={selectedGenre === genre.arcade}
                  onChange={getGamesByGenreHandler}
                />
                Arcade
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={genre.survive}>
                <input
                  type="radio"
                  id={genre.survive}
                  name={genre.survive}
                  value={genre.survive}
                  checked={selectedGenre === genre.survive}
                  onChange={getGamesByGenreHandler}
                />
                Survive
              </label>
            </div>

            <h3>Age</h3>

            <div className={productsStyle.formItem}>
              <label htmlFor={age.all}>
                <input
                  type="radio"
                  id={age.all}
                  name={age.all}
                  value={age.all}
                  checked={selectedAge === age.all}
                  onChange={getGamesByAgeHandler}
                />
                All Ages
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={age.age3}>
                <input
                  type="radio"
                  id={age.age3}
                  name={age.age3}
                  value={age.age3}
                  checked={selectedAge === age.age3}
                  onChange={getGamesByAgeHandler}
                />
                3+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={age.age6}>
                <input
                  type="radio"
                  id={age.age6}
                  name={age.age6}
                  value={age.age6}
                  checked={selectedAge === age.age6}
                  onChange={getGamesByAgeHandler}
                />
                6+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={age.age12}>
                <input
                  type="radio"
                  id={age.age12}
                  name={age.age12}
                  value={age.age12}
                  checked={selectedAge === age.age12}
                  onChange={getGamesByAgeHandler}
                />
                12+
              </label>
            </div>
            <div className={productsStyle.formItem}>
              <label htmlFor={age.age18}>
                <input
                  type="radio"
                  id={age.age18}
                  name={age.age18}
                  value={age.age18}
                  checked={selectedAge === age.age18}
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
