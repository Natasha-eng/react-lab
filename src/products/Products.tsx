// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { GameType } from "@/types/types";
// import { useEffect } from "react";
// import { AppRootState } from "@/app/store";
// import main from "../styles/main.module.css";
// import Game from "./game";
// import { fetchGamesByCategoryThunkCreator } from "./games-reducer";

// type CategoryParams = {
//   category: string;
// };

// function Products(): JSX.Element {
//   const dispatch = useDispatch();
//   const games = useSelector<AppRootState, Array<GameType>>((state) => state.games);

//   const { category } = useParams<CategoryParams>();

//   useEffect(() => {
//     dispatch(fetchGamesByCategoryThunkCreator(category));
//   }, [category]);

//   return (
//     <div className={main.container}>
//       <div>Products page</div>
//       {games.map((g) => (
//         <Game key={g.id} game={g} />
//       ))}
//     </div>
//   );
// }

// export default Products;
