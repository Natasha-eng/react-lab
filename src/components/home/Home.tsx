// import { AppRootState } from "@/app/store";
// import Game from "@/products/game";
// import { fetchGamesThunkCreator } from "@/products/games-reducer";
// import { GameType } from "@/types/types";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import main from "../../styles/main.module.css";
// import headerStyle from "../header/header.module.css";
// import homeStyles from "./home.module.css";

// function Home(): JSX.Element {
//   const dispatch = useDispatch();
//   const games = useSelector<AppRootState, Array<GameType>>((state) => state.games);
//   useEffect(() => {
//     dispatch(fetchGamesThunkCreator());
//   }, []);
//   console.log(games);
//   const gameCards = () => games.map((g) => <Game key={g.id} game={g} />);
//   console.log(gameCards);
//   return (
//     <div className={main.container}>
//       <div>Home page</div>
//       <div className={homeStyles.input}>
//         <input type="text" className={homeStyles.filterInput} placeholder="Search" />
//       </div>
//       <div className={homeStyles.subTitle}>Categories</div>
//       <div className={homeStyles.categories}>
//         <div className={homeStyles.category}>
//           <NavLink to="/products/pc" className={headerStyle.subItem}>
//             PC
//           </NavLink>
//         </div>
//         <div className={homeStyles.category}>
//           <NavLink to="/products/playstation" className={headerStyle.subItem}>
//             Playstation
//           </NavLink>
//         </div>

//         <div className={homeStyles.category}>
//           <NavLink to="/products/xbox" className={headerStyle.subItem}>
//             XBox
//           </NavLink>
//         </div>
//       </div>
//       <div className={homeStyles.subTitle}>New Games</div>
//       {games.map((g) => (
//         <Game key={g.id} game={g} />
//       ))}
//     </div>
//   );
// }

// export default Home;
