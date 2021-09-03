import { AppRootState } from "@/app/storetype";
import { GameType } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchGamesByNameThunkCreator } from "@/thunks/thunks";
import { clearGamesAC } from "@/actions/actions";
import searchInputStyles from "./searchInput.module.css";

function SearchInput(): JSX.Element {
  const dispatch = useDispatch();
  const filteredGames = useSelector<AppRootState, Array<GameType>>((state) => state.filteredGames);

  const [name, setName] = useState<string>("");

  // const db = dispatch(fetchGamesByNameThunkCreator(name));

  const searchByNameHandler = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, 1000);
  useEffect(() => {
    if (name) {
      dispatch(fetchGamesByNameThunkCreator(name));
    } else {
      dispatch(clearGamesAC());
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
      <div className={searchInputStyles.filteredGamesContainer}>
        {filteredGames.map((g) => (
          <div key={g.id}>{g.name}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchInput;
