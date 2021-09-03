import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GameType } from "@/types/types";
import { useEffect } from "react";
import { AppRootState } from "@/app/storetype";
import { fetchGamesByCategoryThunkCreator } from "@/thunks/thunks";
import main from "../styles/main.module.css";
import Game from "./game";
import homeStyles from "../components/home/home.module.css";

type CategoryParams = {
  category: string;
};

function Products(): JSX.Element {
  const dispatch = useDispatch();
  const games = useSelector<AppRootState, Array<GameType>>((state) => state.games);

  const { category } = useParams<CategoryParams>();

  useEffect(() => {
    dispatch(fetchGamesByCategoryThunkCreator(category));
  }, [category]);

  return (
    <div className={main.container}>
      <div>Products page</div>
      <div className={homeStyles.gamesContainer}>
        {games.map((g) => (
          <Game key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}

export default Products;
