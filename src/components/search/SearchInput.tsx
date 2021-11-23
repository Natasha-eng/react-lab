// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { AppRootState } from "@/app/storetype";
import { GameType } from "app/interfcaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { fetchGamesByNameThunkCreator } from "@/thunks/thunks";
import { clearGamesAC } from "@/actions/actions";
import Preloader from "@/elements/preloader/Preloader";
import searchInputStyles from "./css/searchInput.module.css";

const SearchInput = React.memo((): JSX.Element => {
  const dispatch = useDispatch();
  const filteredGames = useSelector<AppRootState, Array<GameType>>((state) => state.filteredGames.games);
  const isFetching = useSelector<AppRootState, boolean>((state) => state.filteredGames.isFetching);

  const [name, setName] = useState<string>("");
  const [search, setSearch] = useState(false);

  const searchByNameHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, 1000);

  const searchSlide = `${searchInputStyles.filteredGamesContainer} ${
    search ? searchInputStyles.searchSlider : searchInputStyles.closeSearchSlider
  }`;

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      alert("got produck");
    }
  }, []);

  const productModalHandler = useCallback(() => {
    alert("got produck");
  }, []);

  useEffect(() => {
    if (name) {
      dispatch(fetchGamesByNameThunkCreator(name));
      setSearch(true);
    } else {
      dispatch(clearGamesAC());
      setSearch(false);
    }
  }, [name, dispatch]);

  return (
    <div className={searchInputStyles.input}>
      <input
        type="text"
        className={searchInputStyles.filterInput}
        placeholder="Search game..."
        onChange={searchByNameHandler}
      />

      {isFetching ? (
        <Preloader />
      ) : (
        <div className={searchSlide}>
          {filteredGames.map((g) => (
            <div key={g.id} onClick={productModalHandler} onKeyPress={handleKeyPress} role="button" tabIndex={0}>
              {g.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SearchInput;
